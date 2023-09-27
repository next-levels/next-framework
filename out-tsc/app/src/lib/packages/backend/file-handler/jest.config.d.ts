declare const _default: {
    displayName: string;
    preset: string;
    testEnvironment: string;
    transform: {
        '^.+\\.[tj]s$': (string | {
            tsconfig: string;
        })[];
    };
    moduleFileExtensions: string[];
    coverageDirectory: string;
};
export default _default;
