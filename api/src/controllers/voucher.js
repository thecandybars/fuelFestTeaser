const { getCurrentFestival } = require("./festival");

const dbError = require("../utils/dbError");
const dbSuccess = require("../utils/dbSuccess");
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

async function burnVoucher(req) {
  const { voucherId } = req.params;
  const voucher = await Voucher.findOne({ where: { assetId: voucherId } });

  if (!voucher) return dbError(`Voucher ${voucherId} not found`, 404);
  if (voucher.isBurnt)
    return dbError(`Voucher ${voucherId} was already burnt`, 404);

  // Recipient burns voucher
  const newVoucher = await Voucher.update(
    { isBurnt: true },
    { where: { assetId: voucherId } }
  );

  return dbSuccess(`Voucher ${voucherId} was burned successfully`);
}
async function ownerConfirmRedeem(req) {
  const { voucherId, confirm } = req.body;

  const voucher = await Voucher.findOne({ where: { assetId: voucherId } });
  if (!voucher) return dbError(`Voucher ${voucherId} not found`, 404);
  if (voucher.isBurnt)
    return dbError(`Voucher ${voucherId} was already burnt`, 404);
  if (voucher.redeemedByOwner !== null)
    return dbError(
      `Voucher ${voucherId} was already confirmed ${voucher.redeemedByOwner}`,
      404
    );
  if (confirm) {
    // Owner confirms redeem voucher
    const now = new Date();
    const updateVoucher = await Voucher.update(
      { redeemedByOwner: now },
      { where: { assetId: voucherId } }
    );
    const newVoucher = await Voucher.findOne({ where: { assetId: voucherId } });
    return dbSuccess(
      `Voucher ${voucherId} redeem was confirmed by owner`,
      { confirm: true, data: newVoucher },
      200
    );
  } else {
    // Owner cancels redeem voucher
    const updateVoucher = await Voucher.update(
      { redeemedByVendor: null },
      { where: { assetId: voucherId } }
    );
    const newVoucher = await Voucher.findOne({ where: { assetId: voucherId } });
    return dbSuccess(
      `Voucher ${voucherId} redeem was cancelled by owner`,
      { confirm: false, data: newVoucher },
      200
    );
  }
}

async function vendorConfirmRedeem(req) {
  const { voucherId, userId } = req.body;
  const voucher = await Voucher.findOne({ where: { assetId: voucherId } });
  if (!voucher) return dbError(`Voucher ${voucherId} not found`, 404);
  if (voucher.isBurnt)
    return dbError(`Voucher ${voucherId} was already burnt`, 404);
  if (voucher.redeemedByVendor !== null)
    return dbError(
      `Voucher ${voucherId} was already confirmed ${voucher.redeemedByVendor}`,
      404
    );
  // Vendor confirms redeem voucher
  const now = new Date();
  const newVoucher = await Voucher.update(
    { redeemedByVendor: now },
    { where: { assetId: voucherId } }
  );
  return dbSuccess(
    `Voucher ${voucherId} redeem was confirmed by vendor`,
    true,
    200
  );
}

async function vendorConfirmedRedeem(req) {
  const { voucherId } = req.params;
  const voucher = await Voucher.findOne({ where: { assetId: voucherId } });
  if (!voucher) return dbError(`Voucher ${voucherId} not found`, 404);
  if (voucher.isBurnt)
    return dbError(`Voucher ${voucherId} was already burnt`, 404);

  const voucherConfirmedByVendor =
    voucher.redeemedByVendor !== null ? true : false;

  return dbSuccess(
    `Voucher redeemed by vendor confirmation`,
    voucherConfirmedByVendor,
    200
  );
}
async function ownerAcceptedRedeem(req) {
  const { voucherId } = req.params;
  const voucher = await Voucher.findOne({ where: { assetId: voucherId } });
  if (!voucher) return dbError(`Voucher ${voucherId} not found`, 404);
  // if (voucher.isBurnt)
  //   return dbError(`Voucher ${voucherId} was already burnt`, 404);

  const voucherConfirmedByOwner =
    voucher.redeemedByOwner !== null ? true : false;

  return dbSuccess(
    `Voucher redeemed by owner confirmation`,
    { confirm: voucherConfirmedByOwner, voucher },
    200
  );
}

module.exports = {
  getVouchersByWallet,
  burnVoucher,
  ownerConfirmRedeem,
  vendorConfirmRedeem,
  vendorConfirmedRedeem,
  ownerAcceptedRedeem,
};
