#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/7603fa674c2adef8439b86e2638bef8cc5129f25f9cf7f4cf794b58d007668bc/contract';
import endContract from '../../snapshots/7603fa674c2adef8439b86e2638bef8cc5129f25f9cf7f4cf794b58d007668bc/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/b11f918340c34ee58701385aa24fc189be09f46b7cb8e7def743d0dfd38fbe27/contract';
import startContract from '../../snapshots/b11f918340c34ee58701385aa24fc189be09f46b7cb8e7def743d0dfd38fbe27/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [this.dropNotNull({ schema: 'public', table: 'jobApplication', column: 'companyName' })];
  }
}

MigrationCLI.run(import.meta.url, M);
