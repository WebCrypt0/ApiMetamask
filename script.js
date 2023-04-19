let meta_id = document.querySelector('#meta-id');
let connect_btn = document.querySelector('#connect-button');
let send_btn = document.querySelector('#send-button');


let eth = 0.452; 
let account; 
let amount = '0x'+(eth*10**18).toString(16);
console.log('amount:'+amount);

connect_btn.addEventListener('click', event => {
 ethereum.request({method: 'eth_requestAccounts'}).then(accounts => {
   account = accounts[0];
   console.log(account);
   meta_id.textContent = 'ID Metamask : '+ account;

   ethereum.request({method: 'eth_getBalance' , params: [account, 'latest']}).then(result => {
     console.log('balance: '+ result);
     let wei = parseInt(result,16);
     console.log('wei: ' + wei);
     let balance = wei / (10**18);
     console.log(balance + ' ETH');
   });
 });
});

 document.getElementById('send-button').addEventListener('click', event =>{
   let transactionParam = {
     to: '0xEE4972994166118937BEd0515ddf70E0A5405E68',
     from: account,
     value: amount
   };

   
   ethereum.request({method: 'eth_sendTransaction', params:[transactionParam]}).then(txhash => {
     console.log(txhash);
     checkTransactionconfirmation(txhash).then(r => alert(r));
   });
             
  });

function checkTransactionconfirmation(txhash) {
 let checkTransactionLoop = () => {
   return ethereum.request({method:'eth_getTransactionReceipt',params:[txhash]}).then(r => {
     if(r !=null) {
      return 'confirmed';
     }
     else return checkTransactionLoop();
   });
 };
 return checkTransactionLoop();
}