export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            APP_PORT: number;
            MYSQL_HOST: string;
            MYSQL_PORT: number;
            MYSQL_USER: string;
            MYSQL_PASSWORD: string;
            MYSQL_DATABASE: string;
            JWT_SECRET: string;
        }
    }
}