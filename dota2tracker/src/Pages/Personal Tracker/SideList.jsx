import { FixedSizeList as List } from 'react-window';

export default function SideList() {

    const Row = ({ index, style }) => (
        <>
        <div className='listrow' style={style}>
          Row {index}
        </div>
        </>
      );
      

    return (
        <>
            <List
                className="List"
                height={150}
                itemCount={50}
                itemSize={35}
                width={700}
            >
                {Row}
            </List>
        </>
    )
}