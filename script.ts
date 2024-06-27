enum TrafficLight {
    Red,
    Yellow,
    Green
}

class Robot {
    private RobotLight: TrafficLight;

    constructor(RobotLight: TrafficLight) {
        this.RobotLight = RobotLight;
        console.log('Robot initialized with light:', TrafficLight[this.RobotLight]);
        this.updateUI();
    }

    public changeTrafficLight(newLight: TrafficLight) {
        this.RobotLight = newLight;
        console.log(`Light changed to: ${TrafficLight[this.RobotLight]}`);
        this.updateUI();
    }

    public getCurrentLight(): TrafficLight {
        return this.RobotLight;
    }

    public async changeLightAfterDelay(newLight: TrafficLight, delay: number) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        this.changeTrafficLight(newLight);
    }

    private updateUI() {
        const redLight = document.getElementById('red-light');
        const yellowLight = document.getElementById('yellow-light');
        const greenLight = document.getElementById('green-light');

        if (!redLight || !yellowLight || !greenLight) {
            console.error('One or more light elements not found!');
            return;
        }

        redLight.classList.remove('on');
        yellowLight.classList.remove('on');
        greenLight.classList.remove('on');

        switch (this.RobotLight) {
            case TrafficLight.Red:
                redLight.classList.add('on');
                break;
            case TrafficLight.Yellow:
                yellowLight.classList.add('on');
                break;
            case TrafficLight.Green:
                greenLight.classList.add('on');
                break;
        }
    }
}

// Create a Robot instance with the initial light set to Red
const robot = new Robot(TrafficLight.Red);

// Run the traffic light cycle for 1 minute (60 seconds)
(async () => {
    for (let i = 0; i < 6; i++) {
        await robot.changeLightAfterDelay(TrafficLight.Yellow, 10000); // 10 seconds
        await robot.changeLightAfterDelay(TrafficLight.Green, 10000); // 10 seconds
        await robot.changeLightAfterDelay(TrafficLight.Red, 10000); // 10 seconds
    }
})();
