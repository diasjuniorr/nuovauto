import PericiaImgContainer from "../pericia-img-container/pericia-img-container.component";
import Dialog from "../pericia-img-dialog/dialog.component";

const PericiaImg = () => {
  return (
    <PericiaImgContainer>
      <Dialog top={100} left={340} name="parafango-ad" />
      <Dialog top={100} left={540} name="porta-ad" />
      <Dialog top={100} left={730} name="porta-pd" />
      <Dialog top={100} left={900} name="parafango-pd" />
      <Dialog top={370} left={270} name="cofano" />
      <Dialog top={370} left={670} name="tetto" />
      <Dialog top={260} left={780} name="pianzone-d" />
      <Dialog top={480} left={780} name="pianzone-s" />
      <Dialog top={370} left={940} name="sportello-s" />
      <Dialog top={370} left={1067} name="sportello-i" />
      <Dialog top={650} left={340} name="parafango-as" />
      <Dialog top={650} left={540} name="porta-as" />
      <Dialog top={650} left={730} name="porta-ps" />
      <Dialog top={650} left={900} name="parafango-ps" />
    </PericiaImgContainer>
  );
};

export default PericiaImg;
