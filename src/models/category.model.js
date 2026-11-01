import {Shema, model} from 'mongoose';

const categorySchema = new Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        minlength: 2,
        maxlength: 100,
    },
    description:{
        type:String,
        trim:true,
        maxlength: 200,
    },
},
{
    timestamps: true,
    versionKey: false,
    toJSON:{virtuals:true},
    //toJson:{virtuals:true}, sirve para que al hacer un find me traiga los virtuals, en este caso el virtual de events
    toObject:{virtuals:true},
    //toObject:{virtuals:true}, sirve para que al hacer un find me traiga los virtuals, en este caso el virtual de events
},
);

categorySchema.virtual('events',{
    ref:'Event',
    localField:'_id',
    foreignField:'category',
});

export const categoryModel = model('Category', categorySchema);