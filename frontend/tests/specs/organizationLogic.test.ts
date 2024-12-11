import { describe, it, expect, jest } from '@jest/globals';

// Mock fetchById function and organization data directly
const mockFetchById = jest.fn();
const mockOrganization = { id: 'test-uuid', name: 'Test Organization' };

// Mock PageBreadcrumbs logic
jest.mock('@/components/page/PageBreadcrumbs.vue', () => ({
    fetchById: mockFetchById,
    organization: mockOrganization,
  }));