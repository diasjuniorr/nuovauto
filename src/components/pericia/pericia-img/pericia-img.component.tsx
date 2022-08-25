import PericiaImgContainer from "../pericia-img-container/pericia-img-container.component";
import Dialog from "../pericia-img-dialog/dialog.component";
import { CAR_PARTS } from "../../../shared/constants/car-parts.constants";

const PericiaImg = () => {
  const {
    PARAFANGO_AD,
    PORTA_AD,
    PORTA_PD,
    PARAFANGO_PD,
    COFANO,
    TETTO,
    PIAZONE_D,
    PIAZONE_S,
    SPORTELLO_S,
    SPORTELLO_I,
    PARAFANGO_AS,
    PORTA_AS,
    PORTA_PS,
    PARAFANGO_PS,
  } = CAR_PARTS;

  return (
    <PericiaImgContainer>
      <Dialog top={100} left={340} partName={PARAFANGO_AD} />
      <Dialog top={100} left={540} partName={PORTA_AD} />
      <Dialog top={100} left={730} partName={PORTA_PD} />
      <Dialog top={100} left={900} partName={PARAFANGO_PD} />
      <Dialog top={370} left={270} partName={COFANO} />
      <Dialog top={370} left={670} partName={TETTO} />
      <Dialog top={260} left={780} partName={PIAZONE_D} />
      <Dialog top={480} left={780} partName={PIAZONE_S} />
      <Dialog top={370} left={940} partName={SPORTELLO_S} />
      <Dialog top={370} left={1067} partName={SPORTELLO_I} />
      <Dialog top={650} left={340} partName={PARAFANGO_AS} />
      <Dialog top={650} left={540} partName={PORTA_AS} />
      <Dialog top={650} left={730} partName={PORTA_PS} />
      <Dialog top={650} left={900} partName={PARAFANGO_PS} />
    </PericiaImgContainer>
  );
};

export default PericiaImg;
