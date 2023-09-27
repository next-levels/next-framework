declare const FrontendAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class FrontendAuthGuard extends FrontendAuthGuard_base {
    handleRequest(error: any, user: any): any;
}
export {};
