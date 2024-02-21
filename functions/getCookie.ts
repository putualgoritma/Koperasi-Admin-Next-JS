import { options } from '@/app/[locale]/api/auth/[...nextauth]/options';
import * as CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import { getServerSession } from 'next-auth';
function getCookie(){
      // const cookieStore = cookies()
    // const t = Cookies.get('__d__')
    // var bytes  = CryptoJS.AES.decrypt(t, 'secret key k01in');
    //   var originalText = bytes.toString(CryptoJS.enc.Utf8);
    //   return JSON.parse(originalText)
    const session = getServerSession(options);
    return session;
}
export default getCookie