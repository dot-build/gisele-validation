describe('Model', function() {

    class Location {
        constructor(coordinates) {
            this.x = coordinates[0];
            this.y = coordinates[1];
        }
    }

    class LocationField extends Gisele.Field {
        parse(value) {
            return Array.isArray(value) ? new Location(value) : null;
        }

        validate(value) {
            let valid = value && value.x && value.y;
            return valid ? true : {
                invalid: true
            };
        }
    }

    beforeEach(function() {
        Gisele.Field.add(Location, LocationField);
    });

    describe('$$.validate()', function() {
        var User;

        beforeEach(function() {
            let fields = {
                name: {
                    type: String,
                    required: true,
                    minlength: 10
                },
                age: {
                    type: Number,
                    required: true,
                    min: 10
                },
                location: {
                    type: Location
                },

                active: {
                    type: Boolean,
                    required: true
                }
            };

            User = Gisele.Model.create(fields);
        });

        it('should run the validation method of each field and save the errors by field in an object', function() {
            let instance = new User();

            instance.$$.validate();

            expect(instance.$$invalid).toBe(true);
            expect(instance.$$errors).toEqual({
                name: {
                    required: true,
                    minlength: true
                },

                age: {
                    min: true,
                    required: true
                },

                location: {
                    invalid: true
                },

                active: {
                    required: true
                }
            });

            instance.name = 'James Smithson';
            instance.age = 20;
            instance.active = false;

            instance.$$.validate();

            expect(instance.$$invalid).toBe(true);
            expect(instance.$$errors).toEqual({
                location: {
                    invalid: true
                }
            });

            instance.location = [10, 10];

            instance.$$.validate();

            expect(instance.$$invalid).toBe(false);
            expect(instance.$$errors).toEqual({});
        });

        it('should be fast', function() {
            let instance = new User();
            let start = Date.now();
            let count = 1000;

            while (count--) instance.$$.validate();

            let end = Date.now();
            let time = end - start;

            if (time > 16) {
                console.warn('Validation took %sms', time);
            }
        });
    });
});
