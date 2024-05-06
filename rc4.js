const RC4 = {
    generateKeyStream: function(key, length) {
        const S = [];
        for (let i = 0; i < 256; i++) {
            S[i] = i;
        }

        // Key Scheduling Algorithm
        let j = 0; 
        for (let i = 0; i < 256; i++) {
            j = (j + S[i] + key.charCodeAt(i % key.length)) % 256;
            [S[i], S[j]] = [S[j], S[i]]; // swap
        }

        //Pseudo-Random Generation Algorithm
        let i = 0; 
        j = 0;
        const keyStream = [];
        for (let k = 0; k < length; k++) {
            i = (i + 1) % 256;
            j = (j + S[i]) % 256;
            [S[i], S[j]] = [S[j], S[i]]; // swap
            const keyByte = S[(S[i] + S[j]) % 256];
            keyStream.push(keyByte);
        }

        return keyStream;
    },

    encrypt: function(plaintext, key) {
        const keyStream = this.generateKeyStream(key, plaintext.length);
        let ciphertext = '';
        for (let i = 0; i < plaintext.length; i++) {
            const cipherByte = plaintext.charCodeAt(i) ^ keyStream[i];
            ciphertext += ('00' + cipherByte.toString(16)).slice(-2);
        }
        return ciphertext;
    },

    decrypt: function(ciphertext, key) {
        const keyStream = this.generateKeyStream(key, ciphertext.length / 2);
        let plaintext = '';
        for (let i = 0; i < ciphertext.length; i += 2) {
            const cipherByte = parseInt(ciphertext.substring(i, i + 2), 16);
            const plainByte = cipherByte ^ keyStream[i / 2];
            plaintext += String.fromCharCode(plainByte);
        }
        return plaintext;
    }
};
