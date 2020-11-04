const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')
const express= require('express')
const app= express()
const port=process.env.PORT || 3000
const path= require('path')
const hbs=require('hbs')
//path joining

const publicDirPath=path.join( __dirname , '../public')

const viewsPath= path.join(__dirname , '../templates/views')

const partialsPath = path.join(__dirname,'../templates/partials')

//path set

app.set('view engine' , 'hbs')
app.set('views', viewsPath)
app.use( express.static(publicDirPath))

hbs.registerPartials(partialsPath)

app.get('/',(req,res)=>{
    res.render('index',{
        title:'Web Application',
        name:'Vivek'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', { 
        title: 'help',
        name: 'vivek'
    })
})
app.get('/about', (req,res)=>{
    res.render('about',{
        title:'about me',
        name:'vivek'
    })
})

app.get('/weather',async(req,res)=>{
    console.log(req.query)
    if(!req.query.address){
        return res.send({
            error:'please provide available address'
        })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            console.log(error)
            return res.send({
                error
            })
        }
        

       forecast(latitude,longitude,(error,forecastData)=>{
           
           if(error){
               console.log(error)
               return res.send({
                   error
               })
           }
            res.send({
                forecastData:forecastData,
                location,
                address:req.query.address

            })
        })
    })
})


app.get('/product',(req,res)=>{
    console.log(req.query.search)
    res.send({ 
        product:['loge Kya ']   
    }) 
    
})





app.get('/help/*', (req,res)=>{
    res.render('404',{
        title:404,
        name:'vivek',
        errorMassage:'help article not found'
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        title:404,
        name:'vivek',
        errorMassage:'this page is not found'
    })
})
app.listen( port, ()=>{
    
    console.log('the server is running on 3000 Fucking port')

})







 