import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'

export default function Graph() {
    return (
        <div className='graph'>  
        <BarChart margin={{top: 0, right:0,bottom:0,left:0}} width={300} height={250} data={[{"name":"Wins","pv":15},{"name":"Losses","pv":3}]}>
            <CartesianGrid horizontal={false} vertical={false} />
            <XAxis tick={{ fill: '#DDE6ED' }} dataKey="name" />
            <YAxis tick={{ fill: '#DDE6ED' }}/>
            <Bar dataKey="pv" fill="#9DB2BF" />
        </BarChart>
        </div>
    )
}