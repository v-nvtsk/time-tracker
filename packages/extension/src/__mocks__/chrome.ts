import {vi} from 'vitest';
import {Store} from '../common/types';
  
let store:Partial<Store> = {
  isAuthenticated: false,
  token: ''
};

vi.stubGlobal('chrome', {
  storage: {local: {
    get: vi.fn((key: keyof Store) => Promise.resolve({[key]: store[key]})),
    set: vi.fn((obj: Partial<Store>) => {
      store = {
        ...store,
        ...obj
      };

      return Promise.resolve();
    }),
    clear: vi.fn(() => {store = {};}),
  }},
  tabs: {
    query: vi.fn(() => Promise.resolve([{
      url: 'https://example.com',
      title: 'Example title'
    }])),
    onActivated: {
      addListener: vi.fn(),
      removeListener: vi.fn()
    },
    onUpdated: {
      addListener: vi.fn(),
      removeListener: vi.fn()
    },
    onRemoved: {
      addListener: vi.fn(),
      removeListener: vi.fn()
    },
  },
  runtime: {
    onInstalled: {
      addListener: vi.fn(),
      removeListener: vi.fn()
    },
    onMessage: {
      addListener: vi.fn(),
      removeListener: vi.fn()
    },
    sendMessage: vi.fn(),
    connect: vi.fn(() => ({onDisconnect: {addListener: vi.fn((port: chrome.runtime.Port) => port),}}))
  }
});