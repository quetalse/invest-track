import './styles.scss';

type PropsT = {
    modifier?: string
    title: string | React.ReactElement<any, any>
    handlerClick: () => void
    className?: string
}

export const AppButton: React.FC<PropsT> = ({modifier, title, handlerClick}) => {

    // const dispatch = useDispatch();
    // const [value, setValue] = useState('');
    // const {data, loading} = useSelector(state => state.stock);

    // const showAlert = (text, status) => dispatch(show(text, status));
    // const addStock = title => dispatch(add(title));
    //
    // const submitHandler = event => {
    //     event.preventDefault();
    //
    //     if (value.trim()){
    //         addStock(value.trim())
    //             .then(() => {
    //                 showAlert('stock added', 'success');
    //             }).catch(() => {
    //             showAlert('error stock added', 'success');
    //         }).finally(() => {
    //             setValue('')
    //         })
    //     }else{
    //         showAlert('Insert ticker or title stock', 'warning');
    //     }
    // }

    return (
        <button
            type="button"
            className={`app-button ${modifier || ''}`}
            onClick={handlerClick}
        >{title}
        </button>
    )
}