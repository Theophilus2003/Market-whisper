#!/usr/bin/env node
/**
 * Market Whisperer — main entrypoint
 * 
 * Usage:
 *   JUPITER_API_KEY=xxx WALLET_ADDRESS=xxx node index.js
 * 
 * Or with all options:
 *   TARGET_TOKEN=SOL \
 *   BASE_DCA_AMOUNT_USDC=35 \
 *   DCA_INTERVAL_SECONDS=14400 \
 *   POLL_INTERVAL_MS=900000 \
 *   LOG_LEVEL=info \
 *   node index.js
 */

import { MarketWhispererAgent } from './src/agent/orchestrator.js';
import { logger } from './src/utils/logger.js';

console.log(`
╔═══════════════════════════════════════════════╗
║      ◈ MARKET WHISPERER — Jupiter Agent       ║
║  Prediction Markets × DCA × Auto OCO Brackets ║
╚═══════════════════════════════════════════════╝
`);

const agent = new MarketWhispererAgent();

// Graceful shutdown
process.on('SIGINT', () => {
  logger.info('\nShutting down gracefully...');
  agent.stop();
  process.exit(0);
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception:', err.message);
  process.exit(1);
});

agent.start().catch(err => {
  logger.error('Fatal error starting agent:', err.message);
  process.exit(1);
});
