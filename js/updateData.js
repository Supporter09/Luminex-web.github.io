import getDataFromDocs from './utils.js'


async function getData(params) {
    let user = await db.collection('users').get();
    let userData = getDataFromDocs(user.docs);
    console.log(userData)
}
getData()