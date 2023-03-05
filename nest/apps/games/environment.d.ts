declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;

    MONGO_HOST: string;
    MONGO_DB: string;
    MONGO_USER: string;
    MONGO_PASS: string;

    REDIS_HOST: string;

    RABBIT_MQ_URI: string;

    ORIGIN: string;
  }
}
