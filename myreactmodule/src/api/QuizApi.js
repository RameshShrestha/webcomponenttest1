//https://myapp2025.cfapps.us10-001.hana.ondemand.com/dumpquestion
const baseURL = "MyDataprovider";
const getDumpQuestions = async (questionID) => {
  let url = baseURL + "/dumpquestion";
  if(questionID){
    url = url + "/"+ questionID;
  }
  try {
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    return error;
  }
}

const addDumpQuestion = async (payload) => {
  let url = baseURL + "/dumpquestion/addquestions";
  payload.questionId = new Date().getTime().toString();
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    return error;
  }
}
const removeDumpQuestion = async (id) => {
  let url = baseURL + "/dumpquestion/removeItem/"+id ;
  try {
    const response = await fetch(url, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    return error;
  }
}
const updateDumpQuestion = async (payload) => {
  let url = baseURL + "/dumpquestion/updateItem/"+ payload._id;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    return error;
  }
}



export { getDumpQuestions, addDumpQuestion ,removeDumpQuestion,updateDumpQuestion};