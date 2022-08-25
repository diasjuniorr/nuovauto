import PericiaImgContainer from "../pericia-img-container/pericia-img-container.component";
import Dialog from "../pericia-img-dialog/dialog.component";

const PericiaImg = () => {
  return (
    <PericiaImgContainer>
      <Dialog top={100} left={340} />
      <Dialog top={100} left={540} />
      <Dialog top={100} left={730} />
      <Dialog top={100} left={900} />
      <Dialog top={370} left={270} name="cofano" />
      <Dialog top={370} left={670} name="tetto" />
      <Dialog top={260} left={780} />
      <Dialog top={480} left={780} />
      <Dialog top={370} left={940} />
      <Dialog top={370} left={1067} />
      <Dialog top={650} left={340} />
      <Dialog top={650} left={540} />
      <Dialog top={650} left={730} />
      <Dialog top={650} left={900} />
    </PericiaImgContainer>
  );
};

export default PericiaImg;
