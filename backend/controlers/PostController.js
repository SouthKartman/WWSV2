import PostModel from "../models/Post.js"


export const getAll = async (req,res) => {
try {

   
    const posts = await PostModel.find().populate('user').exec();  //String on 2 fuctions (find and get in MongoDB post info) (for developers)

    res.json(posts);

} catch (err) {
    console.log(err);

    res.status(500).json({
        message:'не удалось получить статьи',
    });

    }
};
//Error Function on get one post

// export const getOne = async (req,res) => {
//     try {
    
//         const postId = req.params.id;

//         PostModel.findOneAndUpdate(
//         {
//             _id: postId,
//         },
//         {
//             $inc:{ viewsCount: 1 },
//         },
//         {
//             returnDocument:'after',
//         },
//         (err,doc)=>
//         {
//             if(err)
//             {
//                 console.log(err);
    
//                 res.status(500).json
//                 ({
//                     message:'не удалось вернуть статью',
//                 });
//             }
//             if (!doc ){
//                 return res.status(404).json({
//                     message:'статья не найдена',
//                 });
//             } 
//             res.json(doc);
//         }
//         );

//     } catch (err) {
//         console.log(err);
    
//         res.status(500).json({
//             message:'не удалось получить статью',
//         });
    
//         }
// };

//Main Error Function (Here cannot create more 2 functions)
export const create = async (req,res) => {
    try {

        const doc = new PostModel({
            title:req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

    const post = await doc.save();

    res.json(post);
     
    } catch (err) {
        console.log(err);
       
        res.status(500).json({
            message:'Ошибка валидации и создания поста',
        })
    }
}