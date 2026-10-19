#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/28308dce53bb09c6613d18e74145e3d47eeab4d204c5b831f50ca3f4de823fcc/contract';
import startContract from '../../snapshots/28308dce53bb09c6613d18e74145e3d47eeab4d204c5b831f50ca3f4de823fcc/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/b11f918340c34ee58701385aa24fc189be09f46b7cb8e7def743d0dfd38fbe27/contract';
import endContract from '../../snapshots/b11f918340c34ee58701385aa24fc189be09f46b7cb8e7def743d0dfd38fbe27/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropColumn({ schema: 'public', table: 'user', column: 'password' }),
      this.createTable({
        schema: 'public',
        table: 'userAuth',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('provider', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('providerId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'userAuth',
        constraint: 'userAuth_provider_providerId_key',
        columns: ['provider', 'providerId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'userAuth',
        index: 'userAuth_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'userAuth',
        foreignKey: {
          name: 'userAuth_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
