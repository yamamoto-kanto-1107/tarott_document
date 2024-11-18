export const useUtils = () => {
  const actions = {
    // アドレス取得
    getAddress: async (zipcode: string): Promise<string> => {
      const baseUrl = `https://zipcloud.ibsnet.co.jp/api/search`
      const res = await $fetch(baseUrl, {
        method: 'get',
        params: {
          zipcode,
        }
      }).then((response: any)=>{
        console.debug(response);
        const res = JSON.parse(response);
        // console.log(res)
        return res?.results ? res.results[0] : null;
      }).catch(e=>{
        console.error(e);
        throw new Error("郵便番号の取得に失敗しました");
      })
      if(!res){
        throw new Error("該当する郵便番号が見つかりませんでした");
      }

      return res.address1.concat(res.address2).concat(res.address3);
    },
    getAge: (birthday: string): number | null => {
      if(!birthday) return null;
      const getDateNumber = (date: Date) => {
        return date.getFullYear() * 10000
          + date.getMonth() * 100
          + date.getDate();
      }

      birthday = birthday.replaceAll('-', '/');
      birthday = birthday.replaceAll('T', ' ');
  
      const ymd = new Date(birthday);
      const now = new Date();
    
      const birth = getDateNumber(ymd);
      const num = getDateNumber(now);
    
      return Math.floor((num - birth) / 10000);
    }
  }

  const validation = {
    email(value: string) {
      if(!/^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})?$/.test(value)) {
        return 'メールアドレスが不正です';
      }
      return true;
    },
    password(value: string) {
      if(!/^([a-zA-Z0-9.!@#$%&'*+\/=?^_`{|}()[\]~-]{6,})*$/.test(value)){
        return 'パスワードは6文字以上の半角英数字記号で入力してください';
      }
      return true;
    },
    number(value: string) {
      if(value && !/^\d*$/.test(value)){
        return '数字以外の文字が入力されています';
      }
      return true;
    },
    date(value: string) {
      if(!/^(\d{4}-\d{2}-\d{2})?$/.test(value)){
        return '日付が入力されていません';
      }
      return true;
    },
    phone(value: string) {
      if(!/^(\d{10,11})?$/.test(value.replaceAll('-', ''))){
        return '電話番号が不正です';
      }
      return true;
    },
    parental_lock(value: string) {
      if(!/^(\d{4})?$/.test(value.replaceAll('-', ''))){
        return '4桁の数値で入力してください';
      }
      return true;
    },
    kana(value: string) {
      if(!/^([0-9ｦ-ﾟァ-ヶ0-9ー　 ]*)?$/.test(value)){
        return 'カタカナで入力してください';
      }
      return true;
    },
    required(value: string | number | null | undefined) {
      if(!value && value !== 0) {
        return 'この項目は必須です';
      }
      return true;
    }
  }

  return {
    ...actions,
    validation,
  }
};
