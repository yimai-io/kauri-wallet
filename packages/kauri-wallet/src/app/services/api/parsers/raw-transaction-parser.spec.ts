import { ScriptPubKeyData, ScriptSigData, TxAddress, TxModel,
  TxsData, TxVerbose, VinData, VOutData } from '../models/txModel';
import {
  parseAddressItem, parseRawTransaction, parseScriptPubKeyData,
  parseScriptSigData, parseTransactions, parseVerbose, parseVinData,
  parseVoutData } from './raw-transaction-parser';

describe('parseRawTransaction', () => {

  const resp = '{ "data": [ { "currency": "NAV", "addresses": [ { "address": "NW7uXr4ZAeJKigMGnKbSLfCBQY59cH1T8G", "transactions": [ { "txid": "11a7071a43a8da2b9ac116865a6cd92c985c3f7cbde63933d253f88dffaa311a", "rawtx": "", "verbose": null }, { "txid": "c8dad515d5e5c7a45bc5b3814fcf5e1f63474c9b67f84ee2ab9803f809e94929", "rawtx": "01000000f0f33457011a31aaff8df853d23339e6bd7c3f5c982cd96c5a8616c19a2bdaa8431a07a711010000006a47304402202fbb2c5955013fc4806420a66e5c9116902c0263fe7920ae104ff1818ef62efd022040857e3108ae8f30e8a0800f8f892c8a97aa88b67b8e40032e2ba33d3445230e012103f6c3b8154a19327783dd46e0dda13f812f57b00f9246387f62d5ece8bed767b4ffffffff0300000000000000000000debdfcc1c60100232103f6c3b8154a19327783dd46e0dda13f812f57b00f9246387f62d5ece8bed767b4ac3688d6fcc1c60100232103f6c3b8154a19327783dd46e0dda13f812f57b00f9246387f62d5ece8bed767b4ac00000000", "verbose": { "anon-destination": "", "blockhash": "52260690630225abb5b9bd1f9b72774ced5f9b74e18ac2ab7dd5b76d229fbfdd", "blocktime": 1463088112, "confirmations": 2206113, "hash": "c8dad515d5e5c7a45bc5b3814fcf5e1f63474c9b67f84ee2ab9803f809e94929", "height": 523, "hex": "01000000f0f33457011a31aaff8df853d23339e6bd7c3f5c982cd96c5a8616c19a2bdaa8431a07a711010000006a47304402202fbb2c5955013fc4806420a66e5c9116902c0263fe7920ae104ff1818ef62efd022040857e3108ae8f30e8a0800f8f892c8a97aa88b67b8e40032e2ba33d3445230e012103f6c3b8154a19327783dd46e0dda13f812f57b00f9246387f62d5ece8bed767b4ffffffff0300000000000000000000debdfcc1c60100232103f6c3b8154a19327783dd46e0dda13f812f57b00f9246387f62d5ece8bed767b4ac3688d6fcc1c60100232103f6c3b8154a19327783dd46e0dda13f812f57b00f9246387f62d5ece8bed767b4ac00000000", "locktime": 0, "size": 258, "time": 1463088112, "txid": "c8dad515d5e5c7a45bc5b3814fcf5e1f63474c9b67f84ee2ab9803f809e94929", "version": 1, "vin": [ { "scriptSig": { "asm": "304402202fbb2c5955013fc4806420a66e5c9116902c0263fe7920ae104ff1818ef62efd022040857e3108ae8f30e8a0800f8f892c8a97aa88b67b8e40032e2ba33d3445230e[ALL] 03f6c3b8154a19327783dd46e0dda13f812f57b00f9246387f62d5ece8bed767b4", "hex": "47304402202fbb2c5955013fc4806420a66e5c9116902c0263fe7920ae104ff1818ef62efd022040857e3108ae8f30e8a0800f8f892c8a97aa88b67b8e40032e2ba33d3445230e012103f6c3b8154a19327783dd46e0dda13f812f57b00f9246387f62d5ece8bed767b4" }, "sequence": 4294967295, "txid": "11a7071a43a8da2b9ac116865a6cd92c985c3f7cbde63933d253f88dffaa311a", "vout": 1 } ], "vout": [ { "n": 0, "scriptPubKey": { "asm": "", "hex": "", "type": "nonstandard" }, "value": 0, "valueSat": 0 }, { "n": 1, "scriptPubKey": { "addresses": [ "NW7uXr4ZAeJKigMGnKbSLfCBQY59cH1T8G" ], "asm": "03f6c3b8154a19327783dd46e0dda13f812f57b00f9246387f62d5ece8bed767b4 OP_CHECKSIG", "hex": "2103f6c3b8154a19327783dd46e0dda13f812f57b00f9246387f62d5ece8bed767b4ac", "reqSigs": 1, "type": "pubkey" }, "value": 5000114.48, "valueSat": 500011448000000 }, { "n": 2, "scriptPubKey": { "addresses": [ "NW7uXr4ZAeJKigMGnKbSLfCBQY59cH1T8G" ], "asm": "03f6c3b8154a19327783dd46e0dda13f812f57b00f9246387f62d5ece8bed767b4 OP_CHECKSIG", "hex": "2103f6c3b8154a19327783dd46e0dda13f812f57b00f9246387f62d5ece8bed767b4ac", "reqSigs": 1, "type": "pubkey" }, "value": 5000114.49616438, "valueSat": 500011449616438 } ], "vsize": 258 } } ] }, { "address": "NUDke42E3fwLqaBbBFRyVSTETuhWAi7ugk", "transactions": [ { "txid": "c6b6063a0512ed40958bff62a48168b4b30f89cb6bce22b722f8a6d00fcb9d98", "rawtx": "", "verbose": null }, { "txid": "08f87e9de0fd9be71bc91f42d45c48bb9494df5d5df47df7354eec0adbf35731", "rawtx": "01000000f0f3345701989dcb0fd0a6f822b722ce6bcb890fb3b46881a462ff8b9540ed12053a06b6c6010000006a47304402201e6ba4989dd78ee28d826d6d498ccf0cd3f3c855cfac147cdf3d327785bc023902204c0a20f0c7e16aa123f29b26d96067a59bff18404eb03b92b5ad73f8c8131fe20121026a444bf7ca73ae77d1ec959e5e29ffd56cc7b3dd84bb0d250abc37c83ae7b800ffffffff03000000000000000000c0224200c2c601002321026a444bf7ca73ae77d1ec959e5e29ffd56cc7b3dd84bb0d250abc37c83ae7b800ac78c45000c2c601002321026a444bf7ca73ae77d1ec959e5e29ffd56cc7b3dd84bb0d250abc37c83ae7b800ac00000000", "verbose": { "anon-destination": "", "blockhash": "9510cb8d8335f81991f62b104d828a745a4d34984137a6254f99c95b22309bb7", "blocktime": 1463088112, "confirmations": 2206115, "hash": "08f87e9de0fd9be71bc91f42d45c48bb9494df5d5df47df7354eec0adbf35731", "height": 521, "hex": "01000000f0f3345701989dcb0fd0a6f822b722ce6bcb890fb3b46881a462ff8b9540ed12053a06b6c6010000006a47304402201e6ba4989dd78ee28d826d6d498ccf0cd3f3c855cfac147cdf3d327785bc023902204c0a20f0c7e16aa123f29b26d96067a59bff18404eb03b92b5ad73f8c8131fe20121026a444bf7ca73ae77d1ec959e5e29ffd56cc7b3dd84bb0d250abc37c83ae7b800ffffffff03000000000000000000c0224200c2c601002321026a444bf7ca73ae77d1ec959e5e29ffd56cc7b3dd84bb0d250abc37c83ae7b800ac78c45000c2c601002321026a444bf7ca73ae77d1ec959e5e29ffd56cc7b3dd84bb0d250abc37c83ae7b800ac00000000", "locktime": 0, "size": 258, "time": 1463088112, "txid": "08f87e9de0fd9be71bc91f42d45c48bb9494df5d5df47df7354eec0adbf35731", "version": 1, "vin": [ { "scriptSig": { "asm": "304402201e6ba4989dd78ee28d826d6d498ccf0cd3f3c855cfac147cdf3d327785bc023902204c0a20f0c7e16aa123f29b26d96067a59bff18404eb03b92b5ad73f8c8131fe2[ALL] 026a444bf7ca73ae77d1ec959e5e29ffd56cc7b3dd84bb0d250abc37c83ae7b800", "hex": "47304402201e6ba4989dd78ee28d826d6d498ccf0cd3f3c855cfac147cdf3d327785bc023902204c0a20f0c7e16aa123f29b26d96067a59bff18404eb03b92b5ad73f8c8131fe20121026a444bf7ca73ae77d1ec959e5e29ffd56cc7b3dd84bb0d250abc37c83ae7b800" }, "sequence": 4294967295, "txid": "c6b6063a0512ed40958bff62a48168b4b30f89cb6bce22b722f8a6d00fcb9d98", "vout": 1 } ], "vout": [ { "n": 0, "scriptPubKey": { "asm": "", "hex": "", "type": "nonstandard" }, "value": 0, "valueSat": 0 }, { "n": 1, "scriptPubKey": { "addresses": [ "NUDke42E3fwLqaBbBFRyVSTETuhWAi7ugk" ], "asm": "026a444bf7ca73ae77d1ec959e5e29ffd56cc7b3dd84bb0d250abc37c83ae7b800 OP_CHECKSIG", "hex": "21026a444bf7ca73ae77d1ec959e5e29ffd56cc7b3dd84bb0d250abc37c83ae7b800ac", "reqSigs": 1, "type": "pubkey" }, "value": 5000115.07, "valueSat": 500011507000000 }, { "n": 2, "scriptPubKey": { "addresses": [ "NUDke42E3fwLqaBbBFRyVSTETuhWAi7ugk" ], "asm": "026a444bf7ca73ae77d1ec959e5e29ffd56cc7b3dd84bb0d250abc37c83ae7b800 OP_CHECKSIG", "hex": "21026a444bf7ca73ae77d1ec959e5e29ffd56cc7b3dd84bb0d250abc37c83ae7b800ac", "reqSigs": 1, "type": "pubkey" }, "value": 5000115.07958904, "valueSat": 500011507958904 } ], "vsize": 258 } }, { "txid": "52489abff43212445d432f6042e5b9faf99b3c843a79210629b5383f52694ec5", "rawtx": "", "verbose": null }, { "txid": "01f7b0831f174beb8a9b0990ca8bae197f6f1e4fe3d306c755d9f52da5687a9d", "rawtx": "", "verbose": null } ] } ] } ] }';

  let dataModel: TxModel[];

  beforeEach(() => {
    dataModel = parseRawTransaction(JSON.parse(resp));
  });

  describe('currency', () => {

    let currency;

    beforeEach(() => {
      currency = dataModel[0].currency;
    });

    it('data should have currency ', () => {
      expect(dataModel[0].currency).toBeDefined();
    });

    it('currency should be NAV ', () => {
      expect(currency).toEqual('NAV');
    });

  });

  describe('parseAddressItem()', () => {

    let txAddresses: TxAddress;
    let addItem;

    beforeEach(() => {
      addItem = JSON.parse(resp)['data'][0]['addresses'][0];
      txAddresses = parseAddressItem(addItem);
    });

    it('should have correct address', () => {
      expect(txAddresses.address).toEqual('NW7uXr4ZAeJKigMGnKbSLfCBQY59cH1T8G');
    });

  });

  describe('parseTransactions()', () => {

    describe('transaction 1 test', () => {

      let txsData1: TxsData;
      let txs1;

      beforeEach(() => {
        txs1 = JSON.parse(resp)['data'][0]['addresses'][0]['transactions'][0];
        txsData1 = parseTransactions(txs1);
      });

      it('should have correct txid', () => {
        expect(txsData1.txid).toEqual('11a7071a43a8da2b9ac116865a6cd92c985c3f7cbde63933d253f88dffaa311a');
      });

      it('should have correct rawtxt', () => {
        expect(txsData1.rawtx).toEqual('');
      });

      it('should have correct verbose', () => {
        expect(txsData1.verbose).toBeNull();
      });

    });

    describe('transaction 2 test', () => {

      let txsData2: TxsData;
      let tx2;

      beforeEach(() => {

        tx2 = JSON.parse(resp)['data'][0]['addresses'][0]['transactions'][1];
        txsData2 = parseTransactions(tx2);

      });

      it('should have correct txid', () => {
        expect(txsData2.txid).toEqual('c8dad515d5e5c7a45bc5b3814fcf5e1f63474c9b67f84ee2ab9803f809e94929');
      });

      it('should have correct rawtxt', () => {
        expect(txsData2.rawtx).toEqual('01000000f0f33457011a31aaff8df853d23339e6bd7c3f5c982cd96c5a8616c19a2bdaa8431a07a711010000006a47304402202fbb2c5955013fc4806420a66e5c9116902c0263fe7920ae104ff1818ef62efd022040857e3108ae8f30e8a0800f8f892c8a97aa88b67b8e40032e2ba33d3445230e012103f6c3b8154a19327783dd46e0dda13f812f57b00f9246387f62d5ece8bed767b4ffffffff0300000000000000000000debdfcc1c60100232103f6c3b8154a19327783dd46e0dda13f812f57b00f9246387f62d5ece8bed767b4ac3688d6fcc1c60100232103f6c3b8154a19327783dd46e0dda13f812f57b00f9246387f62d5ece8bed767b4ac00000000');
      });

      it('should have verbose', () => {
        expect(txsData2.verbose).toBeDefined();
      });

    });

  });

  describe('parseVerbose()', () => {

    let txVerbose: TxVerbose;
    let txV;

    beforeEach(() => {

      txV = JSON.parse(resp)['data'][0]['addresses'][0]['transactions'][1]['verbose'];
      txVerbose = parseVerbose(txV);

    });

    it('should have no anon dest', () => {
      expect(txVerbose.anonDestination).toEqual('');
    });

    it('should have correct blockhash', () => {
      expect(txVerbose.blockhash).toEqual('52260690630225abb5b9bd1f9b72774ced5f9b74e18ac2ab7dd5b76d229fbfdd');
    });

    it('should have correct blocktime', () => {
      expect(txVerbose.blocktime).toEqual(1463088112);
    });

    it('should have correct confirmations', () => {
      expect(txVerbose.confirmations).toEqual(2206113);
    });

    it('should have correct hash', () => {
      expect(txVerbose.hash).toEqual('c8dad515d5e5c7a45bc5b3814fcf5e1f63474c9b67f84ee2ab9803f809e94929');
    });

    it('should have correct height', () => {
      expect(txVerbose.height).toEqual(523);
    });

    it('should have correct hex', () => {
      expect(txVerbose.hex).toEqual('01000000f0f33457011a31aaff8df853d23339e6bd7c3f5c982cd96c5a8616c19a2bdaa8431a07a711010000006a47304402202fbb2c5955013fc4806420a66e5c9116902c0263fe7920ae104ff1818ef62efd022040857e3108ae8f30e8a0800f8f892c8a97aa88b67b8e40032e2ba33d3445230e012103f6c3b8154a19327783dd46e0dda13f812f57b00f9246387f62d5ece8bed767b4ffffffff0300000000000000000000debdfcc1c60100232103f6c3b8154a19327783dd46e0dda13f812f57b00f9246387f62d5ece8bed767b4ac3688d6fcc1c60100232103f6c3b8154a19327783dd46e0dda13f812f57b00f9246387f62d5ece8bed767b4ac00000000');
    });

    it('should have correct locktime', () => {
      expect(txVerbose.locktime).toEqual(0);
    });

    it('should have correct size', () => {
      expect(txVerbose.size).toEqual(258);
    });

    it('should have correct time', () => {
      expect(txVerbose.time).toEqual(1463088112);
    });

    it('should have correct txid', () => {
      expect(txVerbose.txid).toEqual('c8dad515d5e5c7a45bc5b3814fcf5e1f63474c9b67f84ee2ab9803f809e94929');
    });

    it('should have correct version', () => {
      expect(txVerbose.version).toEqual(1);
    });

  });

  describe('parseVinData()', () => {

    let vinData: VinData;
    let vinD;

    beforeEach(() => {
      vinD = JSON.parse(resp)['data'][0]['addresses'][0]['transactions'][1]['verbose'].vin[0];
      vinData = parseVinData(vinD);
    });

    it('should have a scriptSig object', () => {
      expect(vinData.scriptSig).toBeDefined();
    });

    it('should have correct sequence', () => {
      expect(vinData.sequence).toEqual(4294967295);
    });

    it('should have correct txid', () => {
      expect(vinData.txid).toEqual('11a7071a43a8da2b9ac116865a6cd92c985c3f7cbde63933d253f88dffaa311a');
    });

    it('should have correct vout', () => {
      expect(vinData.vout).toEqual(1);
    });

  });

  describe('parseScriptSigData()', () => {

    let scriptSigData: ScriptSigData;
    let scriptD;

    beforeEach(() => {
      scriptD = JSON.parse(resp)['data'][0]['addresses'][0]['transactions'][1]['verbose'].vin[0].scriptSig;
      scriptSigData = parseScriptSigData(scriptD);
    });

    it('should have asm', () => {
      expect(scriptSigData.asm).toEqual('304402202fbb2c5955013fc4806420a66e5c9116902c0263fe7920ae104ff1818ef62efd022040857e3108ae8f30e8a0800f8f892c8a97aa88b67b8e40032e2ba33d3445230e[ALL] 03f6c3b8154a19327783dd46e0dda13f812f57b00f9246387f62d5ece8bed767b4');
    });

    it('should have hex', () => {
      expect(scriptSigData.hex).toEqual('47304402202fbb2c5955013fc4806420a66e5c9116902c0263fe7920ae104ff1818ef62efd022040857e3108ae8f30e8a0800f8f892c8a97aa88b67b8e40032e2ba33d3445230e012103f6c3b8154a19327783dd46e0dda13f812f57b00f9246387f62d5ece8bed767b4');
    });

  });

  describe('parseVoutData()', () => {

    let voutData: VOutData;
    let voutD;

    beforeEach(() => {
      voutD = JSON.parse(resp)['data'][0]['addresses'][0]['transactions'][1]['verbose'].vout[1];
      voutData = parseVoutData(voutD);
    });

    it('should have correct value for n', () => {
      expect(voutData.n).toEqual(1);
    });

    it('should have scriptPubKey object', () => {
      expect(voutData.scriptPubKey).toBeDefined();
    });

    it('should have correct value for value', () => {
      expect(voutData.value).toEqual(5000114.48);
    });

    it('should have correct value for valueSat', () => {
      expect(voutData.valueSat).toEqual(500011448000000);
    });

  });

  describe('scriptPubKeyData()', () => {

    let scriptPubKeyData: ScriptPubKeyData;
    let scriptD;

    beforeEach(() => {
      scriptD = JSON.parse(resp)['data'][0]['addresses'][0]['transactions'][1]['verbose'].vout[1].scriptPubKey;
      scriptPubKeyData = parseScriptPubKeyData(scriptD);
    });

    it('should have addresses', () => {
      expect(scriptD.addresses).toBeDefined();
    });

    it('should have correct asm', () => {
      expect(scriptD.asm).toEqual('03f6c3b8154a19327783dd46e0dda13f812f57b00f9246387f62d5ece8bed767b4 OP_CHECKSIG');
    });

    it('should have correct hex', () => {
      expect(scriptD.hex).toEqual('2103f6c3b8154a19327783dd46e0dda13f812f57b00f9246387f62d5ece8bed767b4ac');
    });

    it('should have correct reqSigs', () => {
      expect(scriptD.reqSigs).toEqual(1);
    });

    it('should have correct type', () => {
      expect(scriptD.type).toEqual('pubkey');
    });

  });

});




