const getDataPaginated = async (planet= "earth",page = 1) => {

  const response = {
    data: null,
    error: null
  }

  const uri = `https://images-api.nasa.gov/search?q=${planet}&page=${page}`;

  try{
    const rsp = await fetch(uri);

    const rspData = await rsp.json();

    response.data = rspData;

  }catch(err){
    response.error = err
  }

  return response;

}

export {
  getDataPaginated
}