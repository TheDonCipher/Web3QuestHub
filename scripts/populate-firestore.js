/**
 * Firestore Database Population Script
 * 
 * Reads firestore_sample_data.json and populates Firestore collections
 * with initial data for quests, users, badges, HUD sync, and AURA conversations.
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require('../firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'web3questhub'
});

const db = admin.firestore();

/**
 * Parse JSON with comments (strips // comments and extracts collection objects)
 */
function parseJsonWithComments(jsonString) {
  // Remove single-line comments
  const withoutComments = jsonString.replace(/\/\/.*$/gm, '');
  
  // Extract all JSON objects (everything between { and })
  const collections = {};
  let braceDepth = 0;
  let currentJson = '';
  let inString = false;
  let escapeNext = false;
  
  for (let i = 0; i < withoutComments.length; i++) {
    const char = withoutComments[i];
    
    // Handle string literals (to avoid counting braces inside strings)
    if (escapeNext) {
      escapeNext = false;
      if (braceDepth > 0) currentJson += char;
      continue;
    }
    
    if (char === '\\') {
      escapeNext = true;
      if (braceDepth > 0) currentJson += char;
      continue;
    }
    
    if (char === '"' && !escapeNext) {
      inString = !inString;
      if (braceDepth > 0) currentJson += char;
      continue;
    }
    
    // Count braces only outside strings
    if (!inString) {
      if (char === '{') {
        braceDepth++;
        currentJson += char;
      } else if (char === '}') {
        currentJson += char;
        braceDepth--;
        
        // When we close the top-level object, try to parse it
        if (braceDepth === 0 && currentJson.trim()) {
          try {
            const parsed = JSON.parse(currentJson);
            Object.assign(collections, parsed);
            currentJson = '';
          } catch (e) {
            console.warn('Skipping invalid JSON block:', e.message.substring(0, 100));
            currentJson = '';
          }
        }
      } else if (braceDepth > 0) {
        currentJson += char;
      }
    } else if (braceDepth > 0) {
      currentJson += char;
    }
  }
  
  return collections;
}

/**
 * Upload documents to a Firestore collection
 */
async function uploadCollection(collectionName, documents, idField = 'userId') {
  console.log(`\n📦 Uploading ${collectionName}...`);
  
  const batch = db.batch();
  let count = 0;
  
  for (const doc of documents) {
    // Use the specified ID field as document ID
    let docId = doc[idField];
    if (!docId && docId !== 0) {
      console.warn(`⚠️  Skipping document without ${idField}:`, doc);
      continue;
    }
    
    // Convert numeric IDs to strings (Firestore requires string IDs)
    docId = String(docId);
    
    const docRef = db.collection(collectionName).doc(docId);
    batch.set(docRef, doc);
    count++;
    
    // Firestore batch limit is 500 operations
    if (count % 500 === 0) {
      await batch.commit();
      console.log(`   ✓ Committed ${count} documents`);
    }
  }
  
  // Commit remaining documents
  if (count % 500 !== 0) {
    await batch.commit();
  }
  
  console.log(`   ✅ ${collectionName}: ${count} documents uploaded`);
  return count;
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log('🚀 Starting Firestore population...\n');
    console.log('Project ID:', admin.app().options.projectId);
    
    // Read the sample data file
    const dataPath = path.join(__dirname, '..', 'firestore_sample_data.json');
    console.log('Reading data from:', dataPath);
    
    const fileContent = fs.readFileSync(dataPath, 'utf8');
    const collections = parseJsonWithComments(fileContent);
    
    console.log('\n📋 Collections found:', Object.keys(collections).join(', '));
    
    let totalDocs = 0;
    
    // Upload each collection with appropriate ID field
    const collectionMappings = [
      { name: 'user_profile', data: collections.user_profile, idField: 'userId' },
      { name: 'mission_catalog', data: collections.mission_catalog, idField: 'missionId' },
      { name: 'mission_status', data: collections.mission_status, idField: 'statusId' },
      { name: 'expedition_catalog', data: collections.expedition_catalog, idField: 'expeditionId' },
      { name: 'badge_catalog', data: collections.badge_catalog, idField: 'badgeId' },
      { name: 'user_activity_log', data: collections.user_activity_log, idField: 'activityId' },
      { name: 'hud_sync_state', data: collections.hud_sync_state, idField: 'userId' },
      { name: 'level_progression_table', data: collections.level_progression_table, idField: 'level' },
      { name: 'quiz_catalog', data: collections.quiz_catalog, idField: 'quizId' },
      { name: 'leaderboard', data: collections.leaderboard, idField: 'userId' },
      { name: 'aura_conversation_history', data: collections.aura_conversation_history, idField: 'conversationId' },
      { name: 'system_config', data: collections.system_config, idField: 'configKey' }
    ];
    
    for (const mapping of collectionMappings) {
      if (mapping.data && mapping.data.length > 0) {
        const count = await uploadCollection(mapping.name, mapping.data, mapping.idField);
        totalDocs += count;
      } else {
        console.log(`\n⚠️  ${mapping.name}: No data found, skipping`);
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log(`✅ COMPLETE: ${totalDocs} total documents uploaded`);
    console.log('='.repeat(60));
    console.log('\n🎉 Firestore database populated successfully!');
    console.log('\n📊 Next steps:');
    console.log('   1. Verify data in Firebase Console');
    console.log('   2. Deploy Firestore security rules');
    console.log('   3. Deploy Cloud Functions');
    console.log('   4. Test the application\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the script
main();
