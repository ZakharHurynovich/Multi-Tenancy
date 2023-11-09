import { DataSource } from 'typeorm';
import { TenancyHeaderName } from './tenancy.enum';

type ClassType<T> = new (...args: any[]) => T;

function getDatabaseConnectionByName(
  request: Request,
  database1: DataSource,
  database2: DataSource,
  database3: DataSource,
) {
  const name = request.headers['x-tenant-name'] as TenancyHeaderName;

  switch (name) {
    case TenancyHeaderName.company1: {
      return database1;
    }
    case TenancyHeaderName.company2: {
      return database2;
    }
    case TenancyHeaderName.company3: {
      return database3;
    }
    default: {
      return null;
    }
  }
}

export function injectDatabaseConnection<T>(service: ClassType<T>) {
  return (
    request: Request,
    database1: DataSource,
    database2: DataSource,
    database3: DataSource,
    ...args: any
  ) => {
    const connection = getDatabaseConnectionByName(
      request,
      database1,
      database2,
      database3,
    );

    return new service(connection, args);
  };
}
