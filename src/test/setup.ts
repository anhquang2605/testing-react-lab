import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest';
import { beforeAll, afterAll, afterEach, vi } from 'vitest';
import { server } from './server';

// Start MSW before tests run
beforeAll(() => {
  server.listen();
});

// Reset handlers after each test
afterEach(() => {
  server.resetHandlers();
  vi.unstubAllGlobals()
});

// Stop MSW after all tests finish
afterAll(() => {
  server.close();
});