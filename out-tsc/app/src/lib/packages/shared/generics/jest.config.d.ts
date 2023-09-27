declare const _default: {
    displayName: string;
    preset: string;
    setupFilesAfterEnv: string[];
    globals: {
        'ts-jest': {
            tsconfig: string;
            stringifyContentPathRegex: string;
        };
    };
    coverageDirectory: string;
    transform: {
        '^.+\\.(ts|mjs|js|html)$': string;
    };
    transformIgnorePatterns: string[];
    snapshotSerializers: string[];
};
export default _default;
