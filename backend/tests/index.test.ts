import request from "supertest";
import app from "../src/index";

describe("Test index.ts", () => {
    it("Should be up and returning the 'Welcome...' message", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe(
            "Welcome to our free mint marketplace. Please call 'url/listItems' to list minted NFTs, or 'url/purchase/:nftId' to buy one!"
        );
    });

    it("Should return the correct list of NFTs", async () => {
        const res = await request(app).get("/listItems");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("nfts");
        expect(res.body).toHaveProperty("availableQuantity");
    });

    it("Should revert purchasing NFTs if a user address is incorrect.", async () => {
        const inCorrectUserAddress = "0xaec9bB50Aff0158e86Bfdc1728C540D59edD71AD";

        const response = await request(app)
            .post(`/purchase/${inCorrectUserAddress}/1`)
            .send({});
        expect(response.status).toBe(400);
        expect(response.text).toEqual("Wrong user address");
    });

    const correctUserAddress = "0xaeC9bB50Aff0158e86Bfdc1728C540D59edD71AD";

    it("Should revert purchasing NFTs if quantity is lower than 1.", async () => {
        const quantity = 0;
        const response = await request(app)
            .post(`/purchase/${correctUserAddress}/${quantity}`)
            .send({});
        expect(response.status).toBe(401);
        expect(response.text).toEqual("Quantity could not be lesser than 1");
    });

    it("Should revert purchasing NFTs if all NFTs were already sold out.", async () => {
        const quantity = 1000;
        const response = await request(app)
            .post(`/purchase/${correctUserAddress}/${quantity}`)
            .send({});
        expect(response.status).toBe(403);
        expect(response.text).toEqual("Tokens sold out!");
    });

    it("Should purchase NFTs and return a transaction hash.", async () => {
        const quantity = 3;
        const response = await request(app)
            .post(`/purchase/${correctUserAddress}/${quantity}`)
            .send({});
        expect(response.status).toBe(200);
        expect(response.text).toContain("Your NFT is on the way.");
    }, 180000); // Increasing timeout to 3 min as we need to wait until the tx gets confirmed
});