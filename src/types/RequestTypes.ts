import { Request as R } from "express";

export type ParamsRequest<P> = R<P>
export type QueryRequest<Q> = R<{} , {} , {} , Q>
export type BodyRequest<B> = R<{} , {} , B>
export type BodyParamsRequest<B,P> = R<P,{} ,B>
