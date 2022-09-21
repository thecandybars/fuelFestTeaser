const { getCurrentFestival } = require("./festival");

const dbError = require("../utils/dbError");
const { Asset, AssetCategory, Voucher, Vendor } = require("../db.js");
const { getAllVendors } = require("./vendor");

/////// VOUCHER /////////////////

async function getVouchersByWallet(req) {
  try {
    const { walletId } = req.params;

    const voucherCategory = await AssetCategory.findOne({
      where: { table: "Voucher" },
    });
    const vouchersInWallet = await Asset.findAll({
      where: { walletId, categoryId: voucherCategory.id },
    });

    const vouchers = [];
    for (let i = 0; i < vouchersInWallet.length; i++) {
      const voucher = await Voucher.findOne({
        where: { assetId: vouchersInWallet[i].id },
        include: Vendor,
      });
      // voucher.walletId = vouchersInWallet[i].walletId;
      vouchers.push({ voucher, asset: vouchersInWallet[i] });
    }
    return vouchers;
    // return !vouchers || vouchers.length === 0
    //   ? dbError(`No assets found for wallet ${walletId}`, 404)
    //   : vouchers;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getVouchersByWallet,
};
