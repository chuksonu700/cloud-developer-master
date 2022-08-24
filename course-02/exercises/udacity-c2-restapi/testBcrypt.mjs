import bcrypt from 'bcrypt';

const plainTextPassword = "Asdsdsdsdsadsadsd";
const saltRounds =10;

const salt = await bcrypt.genSalt(saltRounds);
const hash  = await bcrypt.hash(plainTextPassword,salt);

const compare =await bcrypt.compare(plainTextPassword,hash); 

console.log('plainTextPassword: ',plainTextPassword);
console.log('salt: ',salt);
console.log('hash: ',hash);
console.log('compare: ',compare);