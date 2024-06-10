const { expect } = require('@playwright/test');

// Post API Call
async function postAPICall(request, url, postAPIHeaderRequest) {
    try {
        const { postAPIHeader, postAPIRequest } = postAPIHeaderRequest;

        // Making a POST request to create a booking
        const postAPIResponse = await request.post(`${url}/booking`, {
            headers: postAPIHeader,
            data: postAPIRequest
        });

        // Verifying the response
        expect(postAPIResponse.status()).toBe(200);
        expect(postAPIResponse.ok()).toBeTruthy();
        console.log(await postAPIResponse.json());

        // Extracting booking ID from the response
        const postResponseBody = await postAPIResponse.json();
        expect(postResponseBody.booking).toHaveProperty("lastname","Bukka");  
        expect(postResponseBody.booking).toHaveProperty("firstname","Dinesh");
        const bId = postResponseBody.bookingid;
        return bId;


    } catch (error) {
        // Handling errors that occur during the POST request
        console.error('Error occurred while executing the Post API request:', error);
        throw error; 
    }
}

// Generate Token API Call
async function generateToken(request, url, tokenAPIHeaderRequest) {
    try {
        const { tokenAPIHeader, tokenAPIRequest } = tokenAPIHeaderRequest;

        // Making a POST request to generate a token
        const tokenAPIResponse = await request.post(`${url}/auth`, {
            headers: tokenAPIHeader,
            data: tokenAPIRequest
        });

        // Verifying the response
        expect(tokenAPIResponse.status()).toBe(200);
        expect(tokenAPIResponse.ok()).toBeTruthy();
        console.log(await tokenAPIResponse.json());

        // Extracting token from the response
        const tokenResponseBody = await tokenAPIResponse.json();
        const tokenNo = tokenResponseBody.token;
        return tokenNo;
    } catch (error) {
        // Handling errors that occur during the token generation request
        console.error('Error occurred while executing the Token API request:', error);
        throw error; 
    }
}

// Get API Call
async function getAPICall(request, url, bId, getAPIHeaderRequest) {
    try {
        const { getAPIHeader } = getAPIHeaderRequest;

        // Making a GET request to retrieve booking information
        const getAPIResponse = await request.get(`${url}/booking/${bId}`, {
            headers: getAPIHeader
        });

        // Verifying the response
        expect(getAPIResponse.status()).toBe(200);
        expect(getAPIResponse.ok()).toBeTruthy();
        console.log(await getAPIResponse.json());
    } catch (error) {
        // Handling errors that occur during the GET request
        console.error('Error occurred while executing the Get API request:', error);
        throw error; 
    }
}

// Delete API Call
async function deleteAPICall(request, url, bId, tokenNo, deleteAPIHeaderRequest) {
    try {
        const { deleteAPIHeader } = deleteAPIHeaderRequest;

        // Adding token to the headers for authorization
        deleteAPIHeaderRequest.deleteAPIHeader.Cookie = `token=${tokenNo}`;

        // Making a DELETE request to delete a booking
        const deleteAPIResponse = await request.delete(`${url}/booking/${bId}`, {
            headers: deleteAPIHeader
        });

        // Verifying the response
        expect(deleteAPIResponse.status()).toBe(201);
        expect(deleteAPIResponse.statusText()).toBe("Created");
        console.log(`Bokking Details Delete for ID - ${bId}`)
    } catch (error) {
        // Handling errors that occur during the DELETE request
        console.error('Error occurred while executing the Delete API request:', error);
        throw error; 
    }
}

// Patch API Call
async function patchAPICall(request, url, bId, tokenNo, patchAPIHeaderRequest) {
    try {
        const { patchAPIHeader,patchAPIRequest } = patchAPIHeaderRequest;

        // Adding token to the headers for authorization
        patchAPIHeaderRequest.patchAPIHeader.Cookie = `token=${tokenNo}`;

        // Making a DELETE request to delete a booking
        const patchAPIResponse = await request.patch(`${url}/booking/${bId}`, {
            headers: patchAPIHeader,
            data : patchAPIRequest
        }); 

        // Verifying the response
        expect(patchAPIResponse.status()).toBe(200);
        expect(patchAPIResponse.ok()).toBeTruthy();
        console.log(await patchAPIResponse.json())
    } catch (error) {
        // Handling errors that occur during the DELETE request
        console.error('Error occurred while executing the Delete API request:', error);
        throw error; 
    }
}

// Put API Call
async function putAPICall(request, url, bId, tokenNo, putAPIHeaderRequest) {
    try {
        const { putAPIHeader,putAPIRequest } = putAPIHeaderRequest;

        // Adding token to the headers for authorization
        putAPIHeaderRequest.putAPIHeader.Cookie = `token=${tokenNo}`;

        // Making a DELETE request to delete a booking
        const putAPIResponse = await request.put(`${url}/booking/${bId}`, {
            headers: putAPIHeader,
            data : putAPIRequest
        }); 

        // Verifying the response
        expect(putAPIResponse.status()).toBe(200);
        expect(putAPIResponse.ok()).toBeTruthy();
        console.log(await putAPIResponse.json())
    } catch (error) {
        // Handling errors that occur during the DELETE request
        console.error('Error occurred while executing the Delete API request:', error);
        throw error; 
    }
}

module.exports = { postAPICall, generateToken, getAPICall, deleteAPICall,patchAPICall, putAPICall };