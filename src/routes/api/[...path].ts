import { APIEvent } from "@solidjs/start/server";
import { elysia } from "./elysia";

const handler = async (event: APIEvent) => await elysia.handle(event.request);

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
