// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/7de6c3dd94feaeb21f20054b9f30d5dabc5efabd/sequelize-fixtures/sequelize-fixtures.d.ts
declare module "sequelize-fixtures"
{
    import * as Sequelize from "sequelize";

    namespace SequelizeFixtures {
        interface Options {
            encoding?: string,
            log?: (message: string) => void,
            transaction?: Sequelize.Transaction,
            transformFixtureDataFn?: (data: any) => any
        }

        interface SequelizeFixturesStatic {
            loadFile(file: string, models: any, options?: Options): Promise<any>;
            loadFiles(files: string[], models: any, options?: Options): Promise<any>;
            loadFixture(fixture: any, models: any, options?: Options): Promise<any>;
            loadFixtures(fixtures: any[], models: any, options?: Options): Promise<any>;
        }
    }

    var sequelizeFixtures: SequelizeFixtures.SequelizeFixturesStatic;

    export = sequelizeFixtures;
}