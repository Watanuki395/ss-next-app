import { describe, test, expect } from '@jest/globals';
import {
  generateSecretSantaPairs,
  generateTrackingCode,
  prepareEmailData,
  generateTestParticipants,
  getPairingStats
} from './secretSantaAlgorithm';

describe('Secret Santa Algorithm', () => {
  describe('generateSecretSantaPairs', () => {
    test('should generate valid pairs for 3 participants', () => {
      const participants = generateTestParticipants(3);
      const pairs = generateSecretSantaPairs(participants);
      
      expect(pairs).toHaveLength(3);
      expect(getPairingStats(pairs).isValid).toBe(true);
    });

    test('should generate valid pairs for 10 participants', () => {
      const participants = generateTestParticipants(10);
      const pairs = generateSecretSantaPairs(participants);
      
      expect(pairs).toHaveLength(10);
      expect(getPairingStats(pairs).isValid).toBe(true);
    });

    test('should throw error for less than 3 participants', () => {
      const participants = generateTestParticipants(2);
      
      expect(() => {
        generateSecretSantaPairs(participants);
      }).toThrow('Se requieren al menos 3 participantes');
    });

    test('should not allow self-assignment', () => {
      const participants = generateTestParticipants(5);
      const pairs = generateSecretSantaPairs(participants);
      
      pairs.forEach(pair => {
        expect(pair.giver.id).not.toBe(pair.receiver.id);
      });
    });

    test('should respect restrictions', () => {
      const participants = generateTestParticipants(4);
      const restrictions = [
        { giverId: 'user-1', receiverId: 'user-2' }
      ];
      
      const pairs = generateSecretSantaPairs(participants, { restrictions });
      
      const restrictedPair = pairs.find(
        p => p.giver.id === 'user-1' && p.receiver.id === 'user-2'
      );
      
      expect(restrictedPair).toBeUndefined();
    });

    test('should avoid previous year pairs', () => {
      const participants = generateTestParticipants(4);
      const previousPairs = [
        { giverId: 'user-1', receiverId: 'user-2' },
        { giverId: 'user-2', receiverId: 'user-3' }
      ];
      
      const pairs = generateSecretSantaPairs(participants, { previousPairs });
      
      const repeatedPair1 = pairs.find(
        p => p.giver.id === 'user-1' && p.receiver.id === 'user-2'
      );
      const repeatedPair2 = pairs.find(
        p => p.giver.id === 'user-2' && p.receiver.id === 'user-3'
      );
      
      expect(repeatedPair1).toBeUndefined();
      expect(repeatedPair2).toBeUndefined();
    });

    test('everyone should give and receive exactly once', () => {
      const participants = generateTestParticipants(7);
      const pairs = generateSecretSantaPairs(participants);
      
      const givers = pairs.map(p => p.giver.id);
      const receivers = pairs.map(p => p.receiver.id);
      
      expect(new Set(givers).size).toBe(participants.length);
      expect(new Set(receivers).size).toBe(participants.length);
    });
  });

  describe('generateTrackingCode', () => {
    test('should generate unique tracking codes', () => {
      const code1 = generateTrackingCode();
      const code2 = generateTrackingCode();
      
      expect(code1).toMatch(/^SS-/);
      expect(code2).toMatch(/^SS-/);
      expect(code1).not.toBe(code2);
    });
  });

  describe('prepareEmailData', () => {
    test('should prepare email data for normal mode', () => {
      const participants = generateTestParticipants(3);
      const pairs = generateSecretSantaPairs(participants);
      const gameInfo = {
        name: 'Navidad 2024',
        date: '2024-12-25',
        budget: 50,
        trackingCode: 'SS-TEST-123'
      };
      
      const emailData = prepareEmailData(pairs, gameInfo, false);
      
      expect(emailData).toHaveLength(3);
      expect(emailData[0].receiverName).toBeTruthy();
      expect(emailData[0].isUltraSecret).toBe(false);
    });

    test('should hide receiver name in ultra secret mode', () => {
      const participants = generateTestParticipants(3);
      const pairs = generateSecretSantaPairs(participants);
      const gameInfo = {
        name: 'Navidad 2024',
        date: '2024-12-25',
        budget: 50,
        trackingCode: 'SS-TEST-123'
      };
      
      const emailData = prepareEmailData(pairs, gameInfo, true);
      
      expect(emailData).toHaveLength(3);
      expect(emailData[0].receiverName).toBeNull();
      expect(emailData[0].isUltraSecret).toBe(true);
      expect(emailData[0].receiverId).toBeTruthy();
    });
  });

  describe('getPairingStats', () => {
    test('should return correct stats', () => {
      const participants = generateTestParticipants(5);
      const pairs = generateSecretSantaPairs(participants);
      const stats = getPairingStats(pairs);
      
      expect(stats.totalPairs).toBe(5);
      expect(stats.uniqueGivers).toBe(5);
      expect(stats.uniqueReceivers).toBe(5);
      expect(stats.isValid).toBe(true);
    });
  });
});
