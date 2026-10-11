import { describe, expect, test } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("GET /api/trips", () => {
    test("returns a successful JSON response", async () => {
        const response = await request(app).get("/api/trips");

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toContain(
            "application/json"
        );
        expect(response.body).toHaveProperty("data");
        expect(response.body).toHaveProperty("pagination");
        expect(response.body.data).toBeInstanceOf(Array);
    });

    test("returns trips from the starter data", async () => {
        const response = await request(app).get("/api/trips");

        expect(response.status).toBe(200);

        expect(response.body.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: "alpine-panorama",
                    name: "Alpine Panorama Express",
                    region: "central"
                })
            ])
        );
    });
});

describe("GET /api/trips/:id", () => {
    test("returns a trip by id", async () => {
        const response = await request(app).get(
            "/api/trips/alpine-panorama"
        );

        expect(response.status).toBe(200);
        expect(response.body.id).toBe("alpine-panorama");
        expect(response.body.name).toBe(
            "Alpine Panorama Express"
        );
        expect(response.body.region).toBe("central");
    });

    test("returns 404 for an unknown trip id", async () => {
        const response = await request(app).get(
            "/api/trips/does-not-exist"
        );

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            error: "Trip not found"
        });
    });
});

