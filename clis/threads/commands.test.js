import { describe, expect, it } from 'vitest';
import { getRegistry, Strategy } from '@jackwener/opencli/registry';
import './search.js';
import './post.js';
import './user.js';

describe('threads command registry', () => {
    it('registers a read-only cookie surface', () => {
        for (const name of ['search', 'post', 'user']) {
            expect(getRegistry().get(`threads/${name}`)).toMatchObject({
                access: 'read',
                strategy: Strategy.COOKIE,
                domain: 'www.threads.com',
            });
        }
    });

    it('uses positional args for the primary subject', () => {
        const positional = (name) => getRegistry().get(`threads/${name}`).args.find((a) => a.positional)?.name;
        expect(positional('search')).toBe('query');
        expect(positional('post')).toBe('target');
        expect(positional('user')).toBe('username');
    });
});
