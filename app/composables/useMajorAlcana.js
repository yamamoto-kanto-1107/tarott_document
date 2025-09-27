export default function fetchAdmin(){
  //supabaseの基本情報
  const nuxtApp = useNuxtApp()
  const supabase = nuxtApp.$supabase

  const getCard = async () =>{
    try{
      const {data,error} = await supabase
      .from('majorArcana')
      .select('*')
      .order('order', { ascending: true })

      if(error){
        console.log(error)
        return false
      }
      return data
    }catch(error){
      console.log(error)
      return false
    }
  }

  const updateOrder = async (id,order) =>{
    try{
      const {data,error} = await supabase
      .from('majorArcana')
      .update({order:order})
      .eq('id',id)

      if(error){
        console.log(error)
        return false
      }
      return true
    }catch(error){
      console.log(error)
      return false
    }
  }

  const getCardId = async (id) =>{
    try{
      const {data,error} = await supabase
      .from('majorArcana')
      .select('*')
      .eq('id',id)

      if(error){
        console.log(error)
        return false
      }
      return data
    }catch(error){
      console.log(error)
      return false
    }
  }

  const updateMajorAlcana = async (id,card) =>{
    try{
      console.log(id)
      console.log('card',card)
      const {data,error} = await supabase
      .from('majorArcana')
      .update({card_name:card[0].card_name,base_confirm:card[0].base_confirm,normal:card[0].normal,reverse:card[0].reverse})
      .eq('id',id)

      if(error){
        console.log(error)
        return false
      }

      return true
    }catch(error){
      console.log(error)
      return false
    }
  }

  const createMajorAlcana = async (card) =>{
    try{
      //大アルカナのうち、orderカラムの最後の値＋１する
      const {data:max_order,error:order_error} = await supabase
      .from('majorArcana')
      .select('order')
      .order('order',{ascending:false})
      .limit(1)

      const new_order = max_order[0].order + 1

      //最大orderを踏まえてデータを追加する（追加されるのは最後）
      const {data,error} = await supabase
      .from('majorArcana')
      .insert({card_name:card[0].card_name,order:new_order,base_confirm:card[0].base_confirm,normal:card[0].normal,reverse:card[0].reverse})

      if(error){
        console.log(error)
        return false
      }
      return true
    }catch(error){
      console.log(error)
      return false
    }
  }

  const getCardFromNameNormal = async (name) =>{
    try{
      const {data,error} = await supabase
      .from('majorArcana')
      .select('normal')
      .eq('card_name',name)

      return data[0]
    }catch(error){
      console.log(error)
    }
  }

  const getCardFromNameReverse = async (name) =>{
    try{
      const {data,error} = await supabase
      .from('majorArcana')
      .select('reverse')
      .eq('card_name',name)

      return data[0]
    }catch(error){
      console.log(error)
    }
  }

  return{
    getCard,
    updateOrder,
    getCardId,
    updateMajorAlcana,
    createMajorAlcana,
    getCardFromNameNormal,
    getCardFromNameReverse
  }
}