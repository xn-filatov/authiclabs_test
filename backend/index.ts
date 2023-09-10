import express from "express";
import env from './environment';
import { ethers } from "ethers";
import { getCollectionNfts, getMaxSupply, contract } from "./utils";
import swaggerDocs from "./swagger";

const app = express();
const port = env.PORT || 3000;

app.use(express.json());

/**
 * @openapi
 * /:
 *  get:
 *     tags:
 *     - Main
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
app.get("/", async (req: any, res) => {
    try {
        res.send("Welcome to our free mint marketplace. Please call 'url/listItems' to list minted NFTs, or 'url/purchase/:nftId' to buy one!");
    } catch (error) {
        res.status(500).send("Internal error");
        console.log(error);
    }
});


/**
 * @openapi
 * /listItems:
 *  get:
 *     tags:
 *     - List NFTs
 *     description: Lists minted NFTs of a collection and amount of NFTs available to mint.
 *     responses:
 *       200:
 *         description: App is up and running
 */
app.get("/listItems", async (req, res) => {
    try {
        var maxSupply = await getMaxSupply();
        var nfts = await getCollectionNfts();

        console.log({ nfts: nfts.length, maxSupply });
        res.send({ ...nfts, availableQuantity: maxSupply ? maxSupply - nfts.length : "Unlimited mint" });
    } catch (error) {
        res.status(500).send("Internal error");
        console.log(error);
    }
});


/**
 * todo: add MAX_GAS ???
 */

/**
 * @openapi
 * '/purchase/{userAddress}/{nftQuantity}':
 *  post:
 *     tags:
 *     - Purchase
 *     summary: Get a single product by the productId
 *     parameters:
 *      - name: userAddress
 *        in: path
 *        description: User address to send NFTs to
 *        required: true
 *      - name: nftQuantity
 *        in: path
 *        description: Quantity of NFTs to send
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/productResponse'
 *       400:
 *         description: Wrong user address
 *       401:
 *         description: Quantity could not be lesser than 1
 */
app.post("/purchase/:userAddress/:nftQuantity", async (req: any, res) => {
    let { userAddress, nftQuantity } = req.params;
    try {
        if (!ethers.isAddress(userAddress))
            return res.status(400).send("Wrong user address");

        if (nftQuantity <= 0)
            return res.status(400).send("Quantity could not be lesser than 1");

        var maxSupply = await getMaxSupply();
        var totalSupply = (await getCollectionNfts()).length;

        if (maxSupply && totalSupply >= maxSupply) {
            return res.send("Tokens sold out!");
        }

        var tx = await contract.mint(nftQuantity, userAddress)

        await tx.wait()
            .catch((err: any) => {
                console.log("err", err);
            });

        res.send(`Your NFT is on the way. Here is Your transaction hash: ${tx.hash}`)
    } catch (error) {
        res.status(500).send("Internal error");
        console.log(error);
    }
});

app.listen(port, async () => {
    console.log(`App listening on port ${port}`);

    swaggerDocs(app, 8080);

});