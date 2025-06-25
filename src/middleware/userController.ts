
const bcrypt = require('bcryptjs');
const User = require('../models/user.ts')

const userControler = { 

    createUser: async function(req, res){
            
            try{
                // Adjust the path as necessary
                const {nickname, email, password} = req.body;
               
                if (!nickname || !email || !password) {
                    return res.status(400).json({ message: 'All fields are required' });
                }
                const salt = await bcrypt.genSaltSync(10);
                const criptedPassword = await bcrypt.hashSync(password, salt);

                await User.create({nickname, email, password: criptedPassword});
                return res.status(201).json({ message: 'User created successfully', user: { nickname, email } });
                

        }catch (error) {
                return res.status(400).json({ message: 'Invalid request body', error: error.message });
            }
        },

    login: async function(req, res) {
       try{
        if (!req.body.email || !req.body.password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

             const actualUser = await User.findOne({ email: req.body.email });
           
            if (actualUser){

            const passwordMatch = await bcrypt.compare(req.body.password, actualUser.password);
            
            if (passwordMatch) {
                return res.status(200).json({ message: 'Login successful', user: { nickname: actualUser.nickname, email: actualUser.email } });
            }

            return res.status(401).json({ message: 'Invalid email or password' });
        }
        return res.status(400).json({ message: 'Invalid email or password'});
 
       }catch (error) {

         res.status(500).json({ message: 'Internal server error', error: error.message });

       }
            
    
    }  ,
    
    updateUserPassword: async function(req, res) {
        const actualPassword = req.body.actualPassword;
        const newPassword = req.body.newPassword;
        try{

            if (!actualPassword || !newPassword) {
                return res.status(400).json({ message: 'Actual password and new password are required' });
            }

            const actualUser = await User.findOne({ email: req.body.email });
            if (!actualUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            const passwordMatch = await bcrypt.compare(actualPassword, actualUser.password);
           
            if (passwordMatch) {
                const salt = await bcrypt.genSaltSync(10);
                const newCriptedPassword = await bcrypt.hashSync(newPassword, salt);
                actualUser.password = newCriptedPassword;
                await actualUser.save();
                return res.status(200).json({ message: 'Password updated successfully' });
            }
            
            return res.status(401).json({ message: 'Invalid actual password' });
        }catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    updateUserNickname: async function(req, res) {
        try{
            const { email, newNickname } = req.body;
            const userAlreadyExists = await User.findOne({ nickname: newNickname });
            
            if(userAlreadyExists){
                return res.status(400).json({ message: 'Nickname already exists' });
            }

            if (!email || !newNickname) {
                return res.status(400).json({ message: 'Email and new nickname are required' });
            }

            const actualUser = await User.findOne({email});
            if (!actualUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            
           
            actualUser.nickname = newNickname;
            await actualUser.save();
            return res.status(200).json({ message: 'Nickname updated successfully', user: { nickname: newNickname, email: actualUser.email } });
        }catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    getUser: async function(req, res) {
        try {
            const nickname  = req.query.nickname;
            console.log(req.query)
            if (!nickname) {
                return res.status(400).json({ message: 'Nickname is required' });
            }

            const user = await User.findOne({ nickname });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json({ user: { nickname: user.nickname, email: user.email, createdAt: user.createdAt } });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    deleteUser: async function(req, res) {
        try {

            const {nickname, email, password} = req.body;
            
            if (!nickname || !email || !password) {
                return res.status(400).json({ message: 'Nickname, email, and password are required' });
            }

            const actualUser = await User.findOne({ nickname, email });
            if (!actualUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            const passwordMatch = await bcrypt.compare(password, actualUser.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid password' });
            }
            User.deleteOne({ nickname, email })
                .then(() => {return res.status(200).json({ message: 'User deleted successfully' })}).catch((error) => {
                    return res.status(500).json({ message: 'Internal server error', error: error.message });
                });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}
module.exports = userControler
