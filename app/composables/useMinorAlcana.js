export default function fetchAdmin(){
  //supabaseの基本情報
  const nuxtApp = useNuxtApp()
  const supabase = nuxtApp.$supabase

  const getCardSmall = async () =>{
    try{
      const {data,error} = await supabase
      .from('minorArcana')
      .select('*')
      .order('genre',{ ascending: true })
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
      .from('minorArcana')
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
      .from('minorArcana')
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

  //大アルカナにも同じ名前があるため再度作成
  const getCardIdSmall = async (id) =>{
    try{
      const {data,error} = await supabase
      .from('minorArcana')
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

  const getCup = async () =>{
    try{
      const {data,error} = await supabase
      .from('minorArcana')
      .select('*')
      .eq('genre','カップ')
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

  const getWand = async () =>{
    try{
      const {data,error} = await supabase
      .from('minorArcana')
      .select('*')
      .eq('genre','ワンド')
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

  const getSord = async () =>{
    try{
      const {data,error} = await supabase
      .from('minorArcana')
      .select('*')
      .eq('genre','ソード')
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

  const getPentacle = async () =>{
    try{
      const {data,error} = await supabase
      .from('minorArcana')
      .select('*')
      .eq('genre','ペンタクル')
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

  const createMinorAlcana = async (card,genre) =>{
    try{
      console.log('call')
      //ジャンルの中でOrderの最大値を取得
      const {data:max_order,error:max_error} = await supabase
      .from('minorArcana')
      .select('order')
      .order('order',{ascending:false})
      .eq('genre',genre)
      .limit(1)

      const new_order = max_order[0].order + 1
      console.log(new_order)

      //値を追加
      const {data,error} = await supabase
      .from('minorArcana')
      .insert({card_name:card[0].card_name,order:new_order,base_confirm:card[0].base_confirm,normal:card[0].normal,reverse:card[0].reverse,genre:genre})

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

  const updateMinorAlcana = async (id,card) =>{
    try{
      const {data,error} = await supabase
      .from('minorArcana')
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

  const getMinorCardFromNameNormal = async (card_name) =>{
    try{
      console.log(card_name)
      const {data,error} = await supabase
      .from('minorArcana')
      .select('normal')
      .eq('card_name',card_name)

      console.log(data)
      return data[0]
    }catch(error){
      console.log(error)
    }
  }

  const getMinorCardFromNameReverse = async (card_name) =>{
    try{
      const {data,error} = await supabase
      .from('minorArcana')
      .select('reverse')
      .eq('card_name',card_name)

      console.log(data)
      return data[0]
    }catch(error){
      console.log(error)
    }
  }

  return{
    getCardSmall,
    updateOrder,
    getCardId,
    getCup,
    getWand,
    getSord,
    getPentacle,
    getCardIdSmall,
    createMinorAlcana,
    updateMinorAlcana,
    getMinorCardFromNameNormal,
    getMinorCardFromNameReverse
  }
}