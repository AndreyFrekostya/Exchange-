import React,{useState, useRef, useEffect, memo} from 'react'
import {FieldValues, SubmitHandler, UseFormHandleSubmit, useForm} from 'react-hook-form'
import styles from './styles.module.css'
import { addPreset, deletePreset } from '../../slices/PresetSlice';
import CheckIcon from '@mui/icons-material/Check';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks';
import { setGraphicsPreset } from '../../../../pages/MainPage/slices/GraphicSlice';
import { changeDistance } from '../../slices/DistanceSetSlice';
import CloseIcon from '@mui/icons-material/Close';
import { changeGraphicMode } from '../../slices/GraphicModeSlice';
import useOutsideClick from '../../../../hooks/useOutClick';
import { changeCoin } from '../../slices/CoinSlice';
interface IModalPreset{
    active:boolean,
    setIsActive:(arg:boolean)=>void
}
const PresetModal:React.FC<IModalPreset>= memo(({active, setIsActive}) => {
    const ref=useRef<HTMLDivElement>(null)
    const [text, setText]=useState<string>('')
    const [heightMain, setHeightMain]=useState<number>(0)
    const [presetError, setPresetError]=useState<boolean>(false)
    const coin=useAppSelector(state=>state.coin)
    const graphics=useAppSelector(state=>state.graphics)
    const dispatch=useAppDispatch()
    const presets=useAppSelector(state=>state.preset)
    const mode=useAppSelector(state=>state.modeGraphic.find(graphic=>graphic.choosed===true))
    const addPresetFunc=(e:React.KeyboardEvent<HTMLDivElement> | null)=>{
      if(e!==null){
        if(e.code=='Enter'){
          if(text){
            setPresetError(false)
            dispatch(addPreset({name: text, settings: graphics, mode: mode?.name, coin: coin}))
            setText('')
            setIsActive(false)
          }else{
            setPresetError(true)
          }
        }
      }else{
        if(text){
          setPresetError(false)
          dispatch(addPreset({name: text, settings: graphics, mode: mode?.name, coin: coin}))
          setText('')
          setIsActive(false)
        }else{
          setPresetError(true)
        }
      }
    }
    const choosePreset=(id:number)=>{
        const choosedPreset=presets.find(preset=>preset.id===id)
        dispatch(setGraphicsPreset(choosedPreset?.settings))
        const choosedGraphic=choosedPreset?.settings.find(graphic=>graphic.choosed===true)
        dispatch(changeDistance(choosedGraphic?.distance))
        dispatch(changeGraphicMode(choosedPreset?.mode))
        dispatch(changeCoin(choosedPreset?.coin))
        setIsActive(false)
      }
    const onClose=()=>{
      setIsActive(false)
    }
    const deletePresetFunc=(id:number)=>{
      dispatch(deletePreset(id))
    }
    useEffect(() => {
      if(ref.current!==null){
        setHeightMain(ref.current.getBoundingClientRect().height)
      }
    }, [presets])
    useOutsideClick(ref,onClose,active)
  return (
    <div ref={ref} style={{overflowY: heightMain > 400 ? 'scroll' : 'auto'}} className={styles.main} onKeyDown={(e)=>addPresetFunc(e)}>
      <div className={styles.wrap}>
        <div className={styles.inputField}>
          <input id='preset_input' type="text" value={text} placeholder='Сохранить шаблон' onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setText(e.target.value)} />
          <CheckIcon onClick={()=>addPresetFunc(null)}/>
        </div>
        <div className={styles.error}>
          {presetError && <p>Введите название!</p>}
        </div>
      </div>
      <div className={styles.presets}>
        {presets.map((preset)=>(
          <div key={preset.id} className={styles.preset}>
            <div className={styles.info} onClick={()=>choosePreset(preset.id)}>
              <p>{preset.name}</p>
            </div>
            <div className={styles.delete} onClick={()=>deletePresetFunc(preset.id)}>
              <CloseIcon/>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

export default PresetModal