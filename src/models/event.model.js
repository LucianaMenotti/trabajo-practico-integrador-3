import {Schema, model} from 'mongoose';

const eventSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxLength:100,
    },
    description:{
        type: String,
        required:true,
        trim:true,
        minlength:20,
    },
    startDate:{
        type:Date,
        required:true,
    },
    endDate:{
        type:Date,
        required:true, 
    },
    capacity:{
        type:Number,
        required:true,
        min:1,
    },
    price:{
        type:Number,
        required:true,
        min:0,
    },
    status:{
        type:String,
        enum:['scheduled','cancelled','finished'],
        default:'scheduled',
    },
    location:{
        venue:{
            type:String,
            required:true,
            minlength:3,
            maxlength:100,
            trim:true,
        },
        address:{
            type:String,
            required:true,
            minlength:5,
            maxlength:150,
            trim:true,
        },
        city:{
            type:String,
            required:true,
            minlength:2,
            maxlength:50,
            trim:true,
        },
    }, 
    //relación 1:N
    organizer:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    // relación N:M
    category:[{
        type: Schema.Types.ObjectId,
        ref:'Category',
        required:true,
    }],
},
{
    timestamps:true,
    versionKey:false,
},
);

export const eventModel = model('Event', eventSchema);