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
    PIANTONE_D,
    PIANTONE_S,
    SPORTELLO_S,
    SPORTELLO_I,
    PARAFANGO_AS,
    PORTA_AS,
    PORTA_PS,
    PARAFANGO_PS,
  } = CAR_PARTS;

  return (
    <PericiaImgContainer>
      <Dialog top={80} left={170} partName={PARAFANGO_AD} />
      <Dialog top={65} left={310} partName={PORTA_AD} />
      <Dialog top={65} left={450} partName={PORTA_PD} />
      <Dialog top={75} left={580} partName={PARAFANGO_PD} />
      <Dialog top={270} left={150} partName={COFANO} />
      <Dialog top={270} left={440} partName={TETTO} />
      <Dialog top={190} left={530} partName={PIANTONE_D} />
      <Dialog top={345} left={530} partName={PIANTONE_S} />
      <Dialog top={270} left={635} partName={SPORTELLO_S} />
      <Dialog top={270} left={713} partName={SPORTELLO_I} />
      <Dialog top={460} left={170} partName={PARAFANGO_AS} />
      <Dialog top={460} left={310} partName={PORTA_AS} />
      <Dialog top={460} left={450} partName={PORTA_PS} />
      <Dialog top={440} left={590} partName={PARAFANGO_PS} />
    </PericiaImgContainer>
  );
};

export default PericiaImg;

// <PericiaImgContainer>
// <Dialog top={100} left={280} partName={PARAFANGO_AD} />
// <Dialog top={90} left={500} partName={PORTA_AD} />
// <Dialog top={90} left={680} partName={PORTA_PD} />
// <Dialog top={100} left={880} partName={PARAFANGO_PD} />
// <Dialog top={380} left={240} partName={COFANO} />
// <Dialog top={370} left={670} partName={TETTO} />
// <Dialog top={260} left={790} partName={PIANTONE_D} />
// <Dialog top={460} left={795} partName={PIANTONE_S} />
// <Dialog top={370} left={950} partName={SPORTELLO_S} />
// <Dialog top={370} left={1067} partName={SPORTELLO_I} />
// <Dialog top={650} left={290} partName={PARAFANGO_AS} />
// <Dialog top={650} left={500} partName={PORTA_AS} />
// <Dialog top={650} left={680} partName={PORTA_PS} />
// <Dialog top={630} left={890} partName={PARAFANGO_PS} />
// </PericiaImgContainer>
