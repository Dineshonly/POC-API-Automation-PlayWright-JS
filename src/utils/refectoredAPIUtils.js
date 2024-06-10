const { expect } = require('@playwright/test');

async function apiCall(request, url, method, endpoint, headerRequest, tokenNo, requestBody = null) {
    try {
        const { headers, data } = headerRequest;
        
        if (tokenNo) {
            headers.Cookie = `token=${tokenNo}`;
        }

        let response;
        switch (method.toLowerCase()) {
            case 'post':
                response = await request.post(`${url}${endpoint}`, { headers, data: requestBody });
                break;
            case 'get':
                response = await request.get(`${url}${endpoint}`, { headers });
                break;
            case 'delete':
                response = await request.delete(`${url}${endpoint}`, { headers });
                break;
            case 'patch':
                response = await request.patch(`${url}${endpoint}`, { headers, data: requestBody });
                break;
            case 'put':
                response = await request.put(`${url}${endpoint}`, { headers, data: requestBody });
                break;
            default:
                throw new Error(`Unsupported method: ${method}`);
        }

        // Verifying the response
        expect(response.status()).toBe(method.toLowerCase() === 'delete' ? 201 : 200);
        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        console.log(responseBody);

        // Specific checks for post and generate token calls
        if (method.toLowerCase() === 'post' && endpoint === '/booking') {
            expect(responseBody.booking).toHaveProperty("lastname", "Bukka");
            expect(responseBody.booking).toHaveProperty("firstname", "Dinesh");
            return responseBody.bookingid;
        } else if (method.toLowerCase() === 'post' && endpoint === '/auth') {
            return responseBody.token;
        }

        return responseBody;
    } catch (error) {
        console.error(`Error occurred while executing the ${method.toUpperCase()} API request:`, error);
        throw error;
    }
}

module.exports = { apiCall };
