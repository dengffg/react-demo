import { useRef, useState } from 'react';
import QrcodeDecoder from './decoderService';
import './index.css';

interface IQrcodeScanner {
  children: any;
}
const QrcodeScanner = ({ children }: IQrcodeScanner) => {
  const qr = useRef(new QrcodeDecoder());
  const [visible, setVisible] = useState(false);

  // 扫一扫
  const handleClick = async () => {
    console.log('开始扫一扫...');
    setVisible(true);
    try {
      const video = document.getElementById('qrVideo') as HTMLVideoElement;
      const code = await qr.current.decodeFromCamera(video);
      if (code) {
        showResult(code);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  // 关闭
  const handleClose = (e: any) => {
    console.log('关闭扫一扫...');
    e.stopPropagation();
    qr.current.stop();
    setVisible(false);
  };

  // 展示结果
  const showResult = (code: any) => {
    console.log('二维码扫描结果:', code);
    alert(code.data);
    qr.current.stop();
    setVisible(false);
  };

  // 上传文件
  const handleFileChange = async (event: any) => {
    console.log('开始上传二维码...');

    if (event.target && event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      const fileImg = await parseFileToImg(file);
      try {
        const code = await qr.current.decodeFromImage(fileImg);
        if (code) {
          showResult(code);
        }
      } catch (error) {
        console.log('error: ', error);
      }
    }
  };

  // 将文件转为图片
  const parseFileToImg = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.addEventListener(
        'load',
        function () {
          img.src = reader.result as string;
          resolve(img);
        },
        false
      );

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <div onClick={() => handleClick()}>{children}</div>
      <div
        className='ScannerWrap'
        style={{ visibility: visible ? 'visible' : 'hidden' }}
      >
        <div onClick={(e) => handleClose(e)} className='CloseIcon'>
          X
        </div>
        <video id='qrVideo' className='VideoWrap'></video>

        <input onChange={handleFileChange} type='file' />
      </div>
    </>
  );
};

export default QrcodeScanner;
