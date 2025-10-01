import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';

const serviceAccountPath = path.resolve(__dirname, '../firebase-service-account.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ Error: firebase-service-account.json not found!');
  console.log('Please download your Firebase service account key from:');
  console.log('Firebase Console → Project Settings → Service Accounts → Generate New Private Key');
  console.log('Save it as: firebase-service-account.json in the project root');
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function seedData() {
  console.log('🌱 Starting Firestore seeding...\n');

  try {
    console.log('📚 Seeding Expeditions...');
    await db.collection('expedition_catalog').doc('digital_frontier').set({
      expeditionId: 'digital_frontier',
      title: 'Expedition 1: Digital Frontier',
      description: 'Learn the fundamentals of wallet security and blockchain identity',
      requiredLevel: 1,
      missionIds: ['procure_test_fuel', 'portal_activation', 'metamask_module'],
      order: 1,
    });

    await db.collection('expedition_catalog').doc('trading_outpost').set({
      expeditionId: 'trading_outpost',
      title: 'Expedition 2: Trading Outpost',
      description: 'Explore decentralized finance and token trading',
      requiredLevel: 4,
      missionIds: [],
      order: 2,
    });

    await db.collection('expedition_catalog').doc('artifact_quarter').set({
      expeditionId: 'artifact_quarter',
      title: 'Expedition 3: Artifact Quarter',
      description: 'Discover NFTs and digital collectibles',
      requiredLevel: 6,
      missionIds: [],
      order: 3,
    });
    console.log('✅ Expeditions seeded\n');

    console.log('🏆 Seeding Badges...');
    await db.collection('badge_catalog').doc('refueler').set({
      id: 'refueler',
      name: 'Refueler',
      description: 'Successfully acquired test network ETH',
      iconUrl: '/badges/refueler.png',
    });

    await db.collection('badge_catalog').doc('portal_key_holder').set({
      id: 'portal_key_holder',
      name: 'Portal Key Holder',
      description: 'Created your first Web3 wallet',
      iconUrl: '/badges/portal_key_holder.png',
    });
    console.log('✅ Badges seeded\n');

    console.log('🎯 Seeding Missions...');
    
    await db.collection('mission_catalog').doc('procure_test_fuel').set({
      missionId: 'procure_test_fuel',
      title: 'Procuring Test Fuel',
      expeditionId: 'digital_frontier',
      expeditionTitle: 'Digital Frontier',
      difficulty: 1,
      xpReward: 500,
      timeEstimate: '5 min',
      platform: 'Sepolia Testnet',
      badge: {
        id: 'refueler',
        name: 'Refueler',
        iconUrl: '/badges/refueler.png',
        description: 'Successfully acquired test network ETH',
      },
      lore: 'Every explorer needs fuel for their journey. In the Web3 world, this fuel is ETH - the native currency of Ethereum. For learning purposes, we use test network ETH which has no real-world value but allows you to experiment safely. Think of it as practice money in a training simulation.',
      actionPlan: [
        'Visit the Sepolia testnet faucet using the link below',
        'Connect your wallet to the faucet website',
        'Request test ETH (you may need to complete a simple verification)',
        'Wait 30-60 seconds for the transaction to process',
        'Return here and click "Verify" to confirm you received the ETH',
      ],
      externalLink: 'https://sepolia-faucet.pk910.de/',
      verification: {
        type: 'balance_check',
        params: {
          targetChainId: '11155111',
          targetCurrency: 'ETH',
          minAmount: 0.0001,
        },
      },
      requiredLevel: 1,
    });

    await db.collection('mission_catalog').doc('portal_activation').set({
      missionId: 'portal_activation',
      title: 'Portal Activation',
      expeditionId: 'digital_frontier',
      expeditionTitle: 'Digital Frontier',
      difficulty: 1,
      xpReward: 100,
      timeEstimate: '10 min',
      platform: 'MetaMask',
      badge: {
        id: 'portal_key_holder',
        name: 'Portal Key Holder',
        iconUrl: '/badges/portal_key_holder.png',
        description: 'Created your first Web3 wallet',
      },
      lore: 'Your wallet is your portal to the decentralized world. It holds your digital identity, assets, and keys. Unlike traditional accounts, YOU are in complete control - no company can freeze or access your wallet. This power comes with responsibility: keep your seed phrase safe and NEVER share it with anyone.',
      actionPlan: [
        'Install the MetaMask browser extension from metamask.io',
        'Click "Create a New Wallet" and set a strong password',
        'CRITICAL: Write down your Secret Recovery Phrase on paper',
        'Store this phrase somewhere safe - it cannot be recovered if lost',
        'Complete the setup and copy your wallet address (starts with 0x...)',
      ],
      externalLink: 'https://metamask.io/download/',
      verification: {
        type: 'manual',
        params: {},
      },
      requiredLevel: 1,
    });

    console.log('✅ Missions seeded\n');

    console.log('📊 Seeding Level Progression Table...');
    const levels = [
      { level: 1, cumulativeXpRequired: 0, title: 'Newbie', unlockDescription: 'Initial Access: Unlocks Digital Frontier' },
      { level: 2, cumulativeXpRequired: 500, title: 'Cadet', unlockDescription: 'Interface Upgrade: Unlocks Logbook history view' },
      { level: 3, cumulativeXpRequired: 1250, title: 'Apprentice', unlockDescription: 'Safety First: Unlocks AURA Security Health Check' },
      { level: 4, cumulativeXpRequired: 2250, title: 'Wanderer', unlockDescription: 'Access: Unlocks Trading Outpost Expedition' },
      { level: 5, cumulativeXpRequired: 3500, title: 'Trader', unlockDescription: 'Insight: Unlocks Leaderboard and filtering options' },
      { level: 6, cumulativeXpRequired: 5000, title: 'Collector', unlockDescription: 'Access: Unlocks Artifact Quarter Expedition' },
      { level: 7, cumulativeXpRequired: 6750, title: 'Guardian', unlockDescription: 'Profile: Unlocks Custom Profile Tag' },
      { level: 8, cumulativeXpRequired: 8750, title: 'Architect', unlockDescription: 'Tools: Unlocks Advanced Wallet Analysis Tools' },
      { level: 9, cumulativeXpRequired: 11000, title: 'Veteran', unlockDescription: 'Customization: Unlocks Dashboard Theme Selector' },
      { level: 10, cumulativeXpRequired: 13500, title: 'Frontier Citizen', unlockDescription: 'Mastery: Unlocks High Security Zone' },
    ];

    for (const levelData of levels) {
      await db.collection('level_progression_table').doc(String(levelData.level)).set(levelData);
    }
    console.log('✅ Level progression table seeded\n');

    console.log('✨ Firestore seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding Firestore:', error);
    process.exit(1);
  }
}

seedData();
