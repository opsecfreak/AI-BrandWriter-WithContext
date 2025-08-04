#!/usr/bin/env node

// Test script to verify Prisma client is working
const { PrismaClient } = require('@prisma/client');

async function testPrisma() {
  try {
    const prisma = new PrismaClient();
    console.log('✅ Prisma client imported successfully');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Test a simple query
    const result = await prisma.task.findMany({ take: 1 });
    console.log('✅ Database query successful, found', result.length, 'tasks');
    
    await prisma.$disconnect();
    console.log('✅ All tests passed!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testPrisma();
